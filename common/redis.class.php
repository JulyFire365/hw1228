<?php

class pRedis {
    public static $redis = '';

    public function __construct(){
        self::$redis = new Redis();
        self::$redis->connect('127.0.0.1',6379);
        self::$redis->auth('917350');
    }

    public function get($name){
        $value = self::$redis->get($name); 
        $value = @unserialize($value);
        return $value;
    }

    public function set($key,$value){
        $value = serialize($value);
        return self::$redis->set($key,$value);
    }
}