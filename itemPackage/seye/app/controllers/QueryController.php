<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Asset\Controllers;

use Phalcon\Mvc\Controller;
use Asset\Utils\MySqlDB;
use Phalcon\Db;

class QueryController extends Controller {
	public function jbhAction() {
        $conn = MySqlDB::getConnection();
        $sql = "select * from websites";
        $result = $conn->fetchAll($sql, Db::FETCH_ASSOC);
        echo json_encode($result);
    }
}
