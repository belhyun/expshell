<?php

class CommandController extends \Phalcon\Mvc\Controller
{
    public function insertAction()
    {
      if($this->request->isPost()){
        $user_commands = new Users();
        $user_commands->serial_id = '1234';
        $user_commands->commands = 'commands';
        if($user_commands->save()){
        }else{
        }
      }
      $this->view->disable();
    }


    public function getAction()
    {
      
    }
}

