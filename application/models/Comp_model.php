<?php
/**
 * Created by PhpStorm.
 * User: opw
 * Date: 5/2/2016
 * Time: 12:33
 */

class Comp_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    function get_comp($data_arr)
    {
        $this->db->select('*');
        $this->db->from('barn_comp');
        $this->db->where($data_arr);
//        if($comp_uid) $this->db->where('comp_uid', $comp_uid);
        $query = $this->db->get();
        return $query->result();
    }

//    function get_all_barn()
//    {
//        $this->db->select('*');
//        $this->db->from('barn_info');
//        $query = $this->db->get();
//        return $query->result();
//    }

    function update_comp($comp_uid, $data_arr)
    {
        $this->db->where('comp_uid', $comp_uid);
        $this->db->update('barn_comp', $data_arr);
        return ($this->db->affected_rows() > 0) ? TRUE : FALSE;
    }

    function create_comp($data_arr)
    {
        $this->db->insert('barn_comp', $data_arr);
        return ($this->db->affected_rows() > 0) ? TRUE : FALSE;
    }

    function delete_comp($comp_uid)
    {
        $this->db->where('comp_uid', $comp_uid);
        $this->db->delete('barn_comp');
        return ($this->db->affected_rows() > 0) ? TRUE : FALSE;
    }

}
