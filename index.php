<?php
    echo "test";
    die;
    if(!session_id()){
        session_start();
    }
    header("Content-type:text/html;charset=utf-8");
    date_default_timezone_set('Asia/Shanghai');
    require_once('./config.php');
    require_once('./framework/main.php');
    MAIN::run($config);
    require_once('./views/index.php');