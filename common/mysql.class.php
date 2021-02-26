<?php
    function connect($config){
        extract($config);
        if(!($con = mysqli_connect($host,$username,$password,$dbname))){
           echo "连接失败：" . mysqli_error();
        }else{
            // echo "连接成功";
            return $con;
        }
    }

    function findOne($result){
        if($result){
            $rs = mysqli_fetch_assoc($result);
            return $rs;
        }
        return false;
    }

    function findAll($result){
        $rs = mysqli_fetch_all($result,MYSQLI_ASSOC);
        return $rs;
    }

    function insert($con,$table,$arr){
        foreach($arr as $key=>$value){
            $value = mysqli_real_escape_string($con,$value);
            $keyArr[] = $key;
            $valueArr[] = "'".$value."'";
        }

        $keys = implode(",",$keyArr);
        $values = implode(",",$valueArr);
        $sql = "insert into ".$table." (".$keys.") values(".$values.")";
        mysqli_query($con,$sql);
    }

    function update($con,$table,$arr,$where){
        foreach($arr as $key=>$value){
            $value = mysqli_real_escape_string($con,$value);
            $keyAndValueArr[] = $key."='".$value."'";
        }
        $keyAndValueArr = implode(",",$keyAndValueArr);
        $sql = "update ".$table." set ".$keyAndValueArr." where ".$where."";
        mysqli_query($con,$sql);
    }

    function deleteNew($con,$table,$arr){
        $str = implode(',',$arr);
        $sql = "delete from ".$table." where id in (".$str.")";
        mysqli_query($con,$sql);
    }

?>