<?php
/**
 * Created by PhpStorm.
 * User: opw
 * Date: 5/2/2016
 * Time: 12:33
 */

class Barn_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    function get_barn($barn_uid)
    {
        $this->db->select('*');
        $this->db->from('barn_info');
        $this->db->where('barn_uid', $barn_uid);
        $query = $this->db->get();

        return $query->result();
    }



}
