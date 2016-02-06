class Barn_model extends CI_Model {
  public function __construct()
  {
          parent::__construct();
  }

  function get_barn($barn_uid)
  {
    $this->db->select('*');
    $query = $this->db->get('barn_info');
    return $quert->result();
  }

}
