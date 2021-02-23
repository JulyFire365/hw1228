<?php

    function M($name){
        require_once('./models/'.$name.'Model.class.php');
        $model = $name.'Model';
        $newModel = new $model();
        return $newModel;
    }

    function V($name){
        require_once($name.'View.class.php');
        $view = $name.'View';
        return $view();
    }

    function C($name,$method){
        require_once('./controllers/'.$name.'Controller.class.php');
        $con = $name.'Controller';
        $obj = new $con();
        $obj -> $method();
    }

    function daddslashes($str){
        return get_magic_quotes_gpc() ? addcslashes($str) : $str;
    }

    function arr2obj($arr){
        $newarr = [];
        foreach($arr as $key=>$value){
            $newarr[$key] = $value;
        }
        return $newarr;
    }