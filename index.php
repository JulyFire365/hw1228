<?php
    header("Content-type:text/html;charset=utf-8");
    date_default_timezone_set('Asia/Shanghai');
    require_once('./config/pro.php');
    require_once('./framework/main.php');
    MAIN::run($config);
