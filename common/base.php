<?php

class Base {
    public function __construct(){
        $auth = isset($_SESSION['auth']) ? $_SESSION['auth'] : '';

        // if(empty($auth)){
        //     $this->ajaxInfo([],'未登录',STATUS_ERROR);
        // }
    }

    public function ajaxInfo($data=[], $msg='', $status=STATUS_SUCCESS){
        $list = [
            'status' => $status,
            'data'   => $data,
            'msg'    => $msg
        ];
        // header('Content-type:text/json');
        echo json_encode($list, JSON_UNESCAPED_UNICODE);
        exit;
    }
}