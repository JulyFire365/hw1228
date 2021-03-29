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

    function  create_folders( $dir ) {
        return  is_dir ( $dir )  or  (create_folders(dirname( $dir ))  and  mkdir ( $dir , 0777));
    }

    function unpack_file($file,$targetName = 'img/默认相册'){
        switch ($file['type'])
        {
        case 'application/x-gzip'://.gz
        exec("gunzip ./".$targetName.$file['name']);
        break;  
        case 'application/x-tar': //.tar
        exec("tar -xvf ./".$targetName.$file['name'] ." -C ./".$targetName);
        break;
        case 'application/octet-stream'://.rar
        exec("unrar e ./".$targetName.$file['name']);
        break;
        default://.zip
            exec("unzip ./".$targetName.$file['name'] .' -d ./'.$targetName);
        }
    }