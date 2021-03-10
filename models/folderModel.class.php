<?php

class folderModel{
    public function initFolderList(){
        $sql = 'select * from folders';
        return DB::findAll($sql);
    }
    public function findFolderId($id){
        $sql = 'select * from folders where id ='.$id;
        return DB::findOne($sql);
    }

    public function findFolderName($name){
        $sql = 'select * from folders where name_ch ='.$name;
        return DB::findOne($sql);
    }

    public function insertFolderName($id,$folderName,$link){
        $arr = ['id'=>$id,'name_ch'=>$folderName,'link'=>$link];
        return DB::insert('folders',$arr);
    }

    public function delFolder($idArr){
        return DB::deleteNew('folders',$idArr);
    }
}