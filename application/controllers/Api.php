<?php
require(APPPATH.'libraries/REST_Controller.php');

class Api extends REST_Controller {
    function barn_get()
    {
        // respond with information about a specific barn, ?id=XXXX
        $request =  $this->get('id');
        if($request)
            $result = $this->barn_model->get_barn( $this->get('id') );
        else
            $this->response(NULL, 404);

        if($result)
            $this->response($result, 200); // 200 being the HTTP response code
        else
            $this->response(NULL, 404);
    }

    function barns_get()
    {
        // respond with information about all barns
        $result = $this->barn_model->get_all_barn();

        if($result)
            $this->response($result, 200); // 200 being the HTTP response code
        else
            $this->response(NULL, 404);
    }

    // update barn info
    function barn_post()
    {
        $result = $this->barn_model->update_barn( $this->post('id'), array(
            'barn_name' => $this->post('name'),
            'barn_code' => $this->post('code'),
            'barn_desc' => $this->post('desc'),
        ));

        if($result === FALSE)
            $this->response(array('status' => 'failed'));
        else
            $this->response(array('status' => 'success'));
    }

    // create new barn
    function createBarn_post()
    {
        $result = $this->barn_model->create_barn( array(
            'barn_name' => $this->post('name'),
            'barn_code' => $this->post('code'),
            'barn_desc' => $this->post('desc'),
        ));

        if($result === FALSE)
            $this->response(array('status' => 'failed'));
        else
            $this->response(array('status' => 'success'));
    }

    // delete barn
    function deleteBarn_post()
    {
        $request =  $this->post('id');

        if($request)
            $result = $this->barn_model->delete_barn($request);
        else
            $this->response(NULL, 404);

        if($result === FALSE)
            $this->response(array('status' => 'failed'));
        else
            $this->response(array('status' => 'success'));
    }

    function updateBarn_post()
    {
        $result = $this->barn_model->update_barn( $this->post('id'), array(
            'barn_name' => $this->post('name'),
            'barn_code' => $this->post('code'),
            'barn_desc' => $this->post('desc'),
        ));

        if($result === FALSE)
            $this->response(array('status' => 'failed'));
        else
            $this->response(array('status' => 'success'));
    }

    /*
     * COMPUTERS
     * */

    // get computer info filterd by barn_uid and comp_uid
    function comp_get()
    {
        $array = array();
        if($this->get('bid')) $array['barn_uid'] = $this->get('bid');
        if($this->get('id')) $array['comp_uid'] = $this->get('id');
        $result = $this->comp_model->get_comp($array);
        $this->response($result);
    }

    function updateComp_post()
    {
        $result = $this->comp_model->update_comp( $this->post('id'), array(
            'comp_code' => $this->post('code'),
            'avail_status' => $this->post('status'),
            'comp_desc' => $this->post('desc'),
            'barn_uid' => $this->post('bid'),
            'loc_x' => $this->post('x'),
            'loc_y' => $this->post('y'),
            'loc_r' => $this->post('r'),
        ));

        if($result === FALSE)
            $this->response(array('status' => 'failed'));
        else
            $this->response(array('status' => 'success'));
    }

    function createComp_post()
    {
        $result = $this->comp_model->create_comp( array(
            'comp_code' => $this->post('code'),
            'avail_status' => $this->post('status'),
            'comp_desc' => $this->post('desc'),
            'barn_uid' => $this->post('bid'),
            'loc_x' => $this->post('x'),
            'loc_y' => $this->post('y'),
            'loc_r' => $this->post('r'),
        ));

        if($result === FALSE)
            $this->response(array('status' => 'failed'));
        else
            $this->response(array('status' => 'success'));
    }

    function deleteComp_post()
    {
        $request =  $this->post('id');

        if($request)
            $result = $this->comp_model->delete_comp($request);
        else
            $this->response(NULL, 404);

        if($result === FALSE)
            $this->response(array('status' => 'failed'));
        else
            $this->response(array('status' => 'success'));
    }

    function auth_post()
    {
        $user_name =  $this->post('id');
        $user_pw =  $this->post('password');

        // TODO: instead of hrad-code, use db
        if($user_name == 'admin' && $user_pw == 'admin')
            $this->response(array('login' => 'success'));
        else
            $this->response(array('login' => 'failed'));

    }



}
