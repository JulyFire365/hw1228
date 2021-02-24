<?php

class folderModel{
    public function initFolderList(){
        $sql = 'select * from folders';
        return DB::findAll($sql);
    }
    public function findFolderName($id){
        $sql = 'select * from folders where id ='.$id;
        return DB::findOne($sql);
    }
    public function insertFolderName($folderName){
        $arr = ['name_ch'=>$folderName];
        return DB::insert('folders',$arr);
    }
}