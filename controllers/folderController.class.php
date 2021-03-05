<?php
// $curdir = dirname(__FILE__);
// include_once($curdir.'/../common/base.php');

class folderController extends Base{
    public static $acceptType = ['jpg','jpeg','png','gif'];
    public function getList(){
        $folder = M('folder');
        $data = $folder->initFolderList();
        $newData = [];
        foreach($data as $key=>$value){
            $newData[] = arr2obj($value);
        }
        $this->ajaxInfo($newData,'',STATUS_SUCCESS);
    }

    public function foldRecordInDb(){
        $folderId = $_GET['id'];
        $folder = M('folder');
        $dataId = $folder->findFolderName($folderId);
        if(!$dataId){
            $dir =  dirname(__FILE__);
            $file = $this->readDirectory($dir.'/../img/'.$folderId.'/');
            $link = '';
            $type = substr(strrchr($file[0], '.'), 1);
            $type = strtolower($type);
            if(in_array($type,self::$acceptType)){
                $link = "/img/".$folderId."/".$file[0];
            }else{
                $link = "/img/默认相册/test.jpg";
            }
            $folder->insertFolderName($folderId,$link);
        }

        $this->ajaxInfo([],'',STATUS_SUCCESS);
    }

    public function tempDir(){
        $folderId = $_POST['folderId'];
        $folder = M('folder');
        $dataId = $folder->findFolderId($folderId);
        $fileName = $dataId ? $dataId['name_ch'] : $folderId;
        $accept = ['application/x-gzip','application/x-tar','application/octet-stream','application/x-zip-compressed','image/x-png','image/png','image/jpg','image/jpeg','image/pjpeg','image/gif'];
        $packArr = array_slice($accept,0,4);
 
        $type = strtolower($_FILES['file']['type']);
        $size = $_FILES['file']['size'];
        $info = "";
        if(in_array($type,$accept) && $size <= 104857600){
            if ($_FILES["file"]["error"] > 0){
                // echo "文件上传错误";
                $info = "Return Code: " . $_FILES["file"]["error"] . "<br />";
            }else{
                if(create_folders('img/'.$fileName)){
                    if (file_exists("img/" .$fileName .'/'. $_FILES["file"]["name"])){
                        $info = $_FILES["file"]["name"] . " already exists. ";
                    }else{
                        move_uploaded_file($_FILES["file"]["tmp_name"], "img/" .$fileName .'/'. $_FILES["file"]["name"]);
                        $info = "success";
                        if(in_array($type,$packArr)){
                            unpack_file($_FILES["file"], 'img/'.$fileName.'/');
                        }
                        $this->ajaxInfo([],$info,STATUS_SUCCESS);
                        exit;
                    }
                }
            }
        }else{
            $info = "无效文件或不符合格式/大小要求";
        }
        $this->ajaxInfo([],$info,STATUS_ERROR);
    }

    /**  
    * @access public 
    * @param mixed $directory 需要读取的目录路径名称
    * @return array 返回类型
    */  
    public function readDirectory($directory){
        if(is_dir($directory) === false){
            return false;
        }
        try{
            $resource = opendir($directory);
            $fold = array();

            while(false !== ($item = readdir($resource))){
                if($item == '.' || $item == '..'){
                    continue;
                }
                // if(is_dir($directory.$item)){
                    $fold[] = $item;
                // }else{
                    // $fold[] = $directory.$item;
                // }
            }
        }catch(Exception $e){
            return false;
        }
        return $fold;
    }

    public function getAllImg(){
        $id = $_GET['id'];
        $folder = M('folder');
        $dataName = $folder->findFolderId($id);
        $dir =  dirname(__FILE__);
        $data = [];
        if($dataName['name_ch']){
            $imgArr = $this->readDirectory($dir.'/../img/'.$dataName['name_ch']);
            foreach($imgArr as $key=>$value){
                $type = substr(strrchr($value, '.'), 1);
                $type = strtolower($type);
                if(in_array($type,self::$acceptType)){
                    $data[] = '/img/'.$dataName['name_ch'].'/'.$value;
                }
            }
        }
        $this->ajaxInfo($data,'',STATUS_SUCCESS); 
    }
}