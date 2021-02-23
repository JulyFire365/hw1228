<?php

    class VIEW{
        public static $view;
        
        public static function init($viewType, $config){
            self::$view = new $viewType;
            foreach($config as $key=>$value){
                self::$view->$key = $value;
            }
        }

        public static function display($template){
            self::$view->display($template);
        }
    }