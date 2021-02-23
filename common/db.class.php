<?php

class DB {
    public static $db;
    public static function init($config){
        self::$db = connect($config);
    }

    public static function query($sql){
        return mysqli_query(self::$db,$sql);
    }

    public static function findOne($sql){
        $result = self::query($sql);
        return findOne($result);
    }

    public static function findAll($sql){
        $result = self::query($sql);
        return findAll($result);
    }

    public static function insert($table,$arr){
        return insert(self::$db,$table,$arr);
    }

    public static function update($table,$arr,$where){
        return update(self::$db,$table,$arr,$where);
    }

    public static function deleteNew($table,$idarr){
        return deleteNew(self::$db,$table,$idarr);
    }
}
//示例：
// DB::insert('users',['name'=>'wangwei','password'=>'wangwei']);
// $sql = 'select * from users';
// var_dump(DB::findAll($sql));
// DB::update('users',['password'=>'123456'],'id=4');
// DB::deleteNew('users',[4]);