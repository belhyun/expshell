<?php


class Users extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;
     
    /**
     *
     * @var string
     */
    public $serial_id;
     
    /**
     *
     * @var string
     */
    public $commands;
     
    /**
     * Independent Column Mapping.
     */
    public function columnMap() {
        return array(
            'id' => 'id', 
            'serial_id' => 'serial_id', 
            'commands' => 'commands'
        );
    }

}
