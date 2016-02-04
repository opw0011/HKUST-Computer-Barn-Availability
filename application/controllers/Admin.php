<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admin extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		echo "admin page";
	}

	public function edit($barn)
	{
		// echo "edit ". $barn;
		$data['barn_id'] = $barn;
		$this->load->view('edit_barn_view', $data);
	}

}

/* End of file Admin.php */
/* Location: ./application/controllers/Admin.php */