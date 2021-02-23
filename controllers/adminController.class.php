<?php
$curdir = dirname(__FILE__);
include_once($curdir.'/../common/base.php');

class adminController extends Base{
    public $auth = "";
    public function login(){
        $data = json_decode(file_get_contents('php://input'),true);
        if($data){
            $auth = M('auth')->login($data);
            if($auth){
                $this->ajaxInfo();
            }else{
                $this->ajaxInfo([],'用户名或密码错误',STATUS_ERROR);
            }
        }
    }
}