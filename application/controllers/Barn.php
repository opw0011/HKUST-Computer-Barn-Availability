<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Barn extends CI_Controller {
	
	public function __construct()
	{
		parent::__construct();
	}

	// remap the second section of url which allows param or method
	function _remap($method)
	{
	  if (method_exists($this, $method))
	  {
	    $this->$method();
	  }
	  else {
	    $this->index($method);
	  }
	}

	public function index($param = 'all')
	{
		$data['barn_id'] = $param;
		$this->load->view('main_view', $data);
	}

	public function overview() {
		echo "barn overview page";
		// pass differnet data
		$this->load->view('main_view');
	}

	public function data($type = 'all') {
		// $barn_avail = array(
		// 	"num_comp"=>"10",
		// 	"num_avail"=>"3"
		// );
		if ($type == 'all'){
			$data = array(
				array("barn_id"=>"a", "num_comp"=>"40", "num_avail"=>"31"),
				array("barn_id"=>"b", "num_comp"=>"80", "num_avail"=>"42"),
				array("barn_id"=>"c", "num_comp"=>"60", "num_avail"=>"40"),
				array("barn_id"=>"d", "num_comp"=>"40", "num_avail"=>"4"),
			);
		}


		$this->output->set_content_type('application/json')
		->set_output(json_encode($data));
	}
}

/* End of file Barn.php */
/* Location: ./application/controllers/Barn.php */
