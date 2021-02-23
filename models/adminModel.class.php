<?php
    class adminModel{
        public function find_by_name($name){
            $sql = 'select * from users where name="'.$name.'"';
            return DB::findOne($sql);
        }
    }