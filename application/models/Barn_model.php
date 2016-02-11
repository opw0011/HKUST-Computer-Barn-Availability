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

    function get_all_barn()
    {
        $this->db->select('*');
        $this->db->from('barn_info');
        $query = $this->db->get();
        return $query->result();
    }

    function update_barn($barn_uid, $data_arr)
    {
        $this->db->where('barn_uid', $barn_uid);
        $this->db->update('barn_info', $data_arr);
        return ($this->db->affected_rows() > 0) ? TRUE : FALSE;
    }

    function create_barn($data_arr)
    {
        $this->db->insert('barn_info', $data_arr);
        return ($this->db->affected_rows() > 0) ? TRUE : FALSE;
    }

    function delete_barn($barn_uid)
    {
        $this->db->where('barn_uid', $barn_uid);
        $this->db->delete('barn_info');
        return ($this->db->affected_rows() > 0) ? TRUE : FALSE;
    }

}
