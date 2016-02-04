<?php
require(APPPATH.'libraries/REST_Controller.php');

class Api extends REST_Controller {
  function user_get()
  {
      // respond with information about a user
      // echo "hi";
      $data = array('returned: '. $this->get('id'));
      $this->response($data);
  }

  function users_get()
  {
      // respond with information about several users
  }
}
