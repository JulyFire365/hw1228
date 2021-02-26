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

    public function tempDir(){
        $folderId = $_POST['folderId'];

        $folder = M('folder');
        $dataId = $folder->findFolderId($folderId);
        $dataName = $folder->findFolderName($folderId);

        $fileName = $dataId ? $dataId['name_ch'] : $folderId;
        if(!$dataId && !$dataName){
            $folder->insertFolderName($folderId);
        }
        // var_dump($data);
        $accept = ['application/x-gzip','application/x-tar','application/octet-stream','application/x-zip-compressed','image/x-png','image/png','image/jpg','image/jpeg','image/pjpeg','image/gif'];
        $packArr = array_slice($accept,0,4);
 
        $type = $_FILES['file']['type'];
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

    public function getAllFile(){
        //获取当前文件所在的绝对目录
        $dir =  dirname(__FILE__);
        //扫描文件夹
        $file = scandir($dir.'/../img');
        //显示
        $fileArr = [];
        $foldArr = array_slice($file,2);
        foreach($foldArr as $key=>$value){
            $newFile = scandir($dir.'/../img/'.$value);
            $type = substr(strrchr($newFile[2], '.'), 1);
            if(in_array($type,self::$acceptType)){
                $fileArr[$value] = $newFile[2];
            }else{
                $fileArr[$value] = "special_handle";
            }
        }
        $data = [];
        $folder = M('folder');
        $dataStatic = $folder->initFolderList();
        $dataArr = [];
        foreach($dataStatic as $key=>$value){
            $dataArr[] = [$value['name_ch'] => $value[id]];
        }
        $i = 0;
        foreach($fileArr as $key=>$value){
            $obj = [];
            foreach($dataStatic as $key1=>$value1){
                if($value1['name_ch'] == $key){
                    $obj['id'] = $value1['id'];
                }
            }
            $i++;
            $obj['name'] = $key;
            $obj['link'] = $value == 'special_handle' ? '/img/默认相册/test.jpg' : '/img/'.$key.'/'.$value;
            $data[] = arr2obj($obj);
        }
        $this->ajaxInfo($data,'',STATUS_SUCCESS);
    }

    public function getAllImg(){
        $id = $_GET['id'];
        $folder = M('folder');
        $dataName = $folder->findFolderId($id);
 
        $imgArr = [];
        $dir =  dirname(__FILE__);
        $data = [];
        if($dataName['name_ch']){
            $imgArr = scandir($dir.'/../img/'.$dataName['name_ch']);
            if(count($imgArr) > 2){
                $imgArr = array_slice($imgArr,2);
                foreach($imgArr as $key=>$value){
                    $type = substr(strrchr($value, '.'), 1);
                    if(in_array($type,self::$acceptType)){
                        $data[] = '/img/'.$dataName['name_ch'].'/'.$value;
                    }
                }
            }
        }
        $this->ajaxInfo($data,'',STATUS_SUCCESS); 
    }
}