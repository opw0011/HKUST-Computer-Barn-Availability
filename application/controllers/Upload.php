<?php
/**
 * Created by PhpStorm.
 * User: opw
 * Date: 11/4/2016
 * Time: 9:42
 */
class Upload extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
    }

    public function index()
    {
//        $this->load->view('upload_form', array('error' => ' ' ));
    }

    public function do_upload()
    {
        $config['upload_path']          = './uploads/';
        $config['allowed_types']        = 'gif|jpg|png';
        $config['encrypt_name']         = true;
        $config['file_ext_tolower']     = true;
        $config['max_size']             = 4096; // max size 4MB
//        $config['max_width']            = 1024;
//        $config['max_height']           = 768;

        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload('file'))
        {
            // fail to upload
            $error = $this->upload->display_errors();
            $this->output
                ->set_status_header(400)
                ->set_content_type('application/json')
                ->set_output(json_encode(array('message' => $error)));
        }
        else
        {
            // success uploaded
//            $file_name =  $this->upload->data('file_name');
            $this->output
                ->set_status_header(200)
                ->set_content_type('application/json')
                ->set_output(json_encode(
                    array(
                        'message' => 'Success',
                        'file_name' =>$this->upload->data('file_name')
                        )
                ));
        }
    }
}