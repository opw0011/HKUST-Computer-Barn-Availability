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
				array("barn_name"=>"Barn A","barn_id"=>"1000", "num_comp"=>"40", "num_avail"=>"31"),
				array("barn_name"=>"Barn B","barn_id"=>"1001", "num_comp"=>"80", "num_avail"=>"42"),
				array("barn_name"=>"Barn C","barn_id"=>"1002", "num_comp"=>"60", "num_avail"=>"40"),
				array("barn_name"=>"Barn D","barn_id"=>"1003", "num_comp"=>"40", "num_avail"=>"4"),
			);
		}


		$this->output->set_content_type('application/json')
		->set_output(json_encode($data));
	}

	// edit barn computers location
	public function edit() {
		$this->load->view('test');
			/*
			$jsonString = file_get_contents('assets/data/barn_info.json');
			$data = json_decode($jsonString);
			// var_dump($data);
			var_dump($data[0]->compsLoc[0]->id);


			// $data[0]->activity_name = "TENNIS";
			// or if you want to change all entries with activity_code "1"
			foreach ($data as $key => $entry) {
			    if ($entry->barn_code == 'a') {
			        $data[$key]->barn_name = "ssds";
			    }
			}

			$newJsonString = json_encode($data);
			file_put_contents('assets/data/barn_info.json', $newJsonString);
			*/
	}

	// handel update Json Request
	public function update() {

		// print_r(json_decode(file_get_contents('php://input')));
		$new_json = json_decode(file_get_contents('php://input'));
		print_r($new_json);
			
		// $jsonString = file_get_contents('assets/data/barn_info.json');
		// $data = json_decode($jsonString);
		// // var_dump($data);
		// var_dump($data[0]->compsLoc[0]->id);


		// // $data[0]->activity_name = "TENNIS";
		// // or if you want to change all entries with activity_code "1"
		// foreach ($data as $key => $entry) {
		//     if ($entry->barn_code == 'a') {
		//         $data[$key]->barn_name = "ssds";
		//     }
		// }

		$newJsonString = json_encode($new_json);
		// echo $newJsonString;
		file_put_contents('assets/data/barn_info.json', $newJsonString);


	}
}

/* End of file Barn.php */
/* Location: ./application/controllers/Barn.php */
