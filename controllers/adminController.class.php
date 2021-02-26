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
    public function isLogin(){
        $model = M('auth');
        $auth = $model->getAuth();
        if($auth){
            $this->ajaxInfo(['name'=>$auth['name']],'',STATUS_SUCCESS);
        }else{
            $this->ajaxInfo([],'未登录',STATUS_LOGIN_ERROR);
        }
    }

    public function logout(){
        $model = M('auth');
        $model->logout();
        $this->ajaxInfo([],'',STATUS_SUCCESS);
    }
}