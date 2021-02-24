<?php
// $curdir = dirname(__FILE__);
// include_once($curdir.'/../common/base.php');

class folderController extends Base{
    // public $fileArr = [];
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
        $data = $folder->findFolderName($folderId);
        $fileName = $data ? $data['name_ch'] : $folderId;
        if(!$data){
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
}