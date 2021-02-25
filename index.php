<?php
    header("Content-type:text/html;charset=utf-8");
    date_default_timezone_set('Asia/Shanghai');
    
    define('RUN_ENV', isset($_SERVER['RUN_ENV']) ? $_SERVER['RUN_ENV'] : 'dev');

    require_once('./config/'.RUN_ENV.'.php');
    require_once('./framework/main.php');
    MAIN::run($config);
