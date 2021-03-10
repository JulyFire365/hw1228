<?php

class permissionController extends Base{
    public function getPermission(){
        $auth = M('auth')->getAuth();
        $arr = $auth['name'] == 'wangwei' ? ['del'] : [];

        $data = [
            'permission' => $arr
        ];

        $this->ajaxInfo($data,'',STATUS_SUCCESS);
    }
}