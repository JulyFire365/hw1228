<?php

class authModel {
    private $auth = "";
    public function __construct(){
        $this->auth = (isset($_SESSION['auth']) && !empty($_SESSION['auth'])) ? $_SESSION['auth'] : '';
    }

    public function getAuth(){
        return $this->auth;
    }

    public function logout(){
        unset($_SESSION['auth']);
    }

    public function checkUser($name,$password){
        $admin = M('admin');
        $auth = $admin -> find_by_name($name);
        if(!empty($auth) && $auth['password'] == $password){
            return $auth;
        }else{
            return false;
        }
    }

    public function login($data){
        if(empty($data['name']) || empty($data['password'])){
            return false;
        }
        $name = addslashes($data['name']);
        $password = addslashes($data['password']);
        if($this->auth = $this->checkUser($name,$password)){
            $_SESSION['auth'] = $this->auth;
            return true;
        }else{
            return false;
        }
    }
}