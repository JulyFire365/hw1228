<?php

$curdir = dirname(__FILE__);
include_once($curdir.'/include.list.php');
foreach($paths as $path){
    include_once($curdir.'/../'.$path);
}

class MAIN{
    public static $controller;
    public static $method;
    private static $config;
    private static $sql;
    private static function init_db(){
        DB::init(self::$config);
    }

    private static function init_controller(){
        self::$controller = isset($_GET['controller']) ? daddslashes($_GET['controller']) : 'index';
    }

    private static function init_method(){
        self::$method = isset($_GET['method']) ? daddslashes($_GET['method']) : 'index';
    }

    public static function run($config){
        self::$config = $config;
        self::init_db();
        self::init_controller();
        self::init_method();
        C(self::$controller,self::$method);
    }
}