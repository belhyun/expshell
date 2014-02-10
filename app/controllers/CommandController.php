<?php

class CommandController extends \Phalcon\Mvc\Controller
{
  public function initialize()
  {
    $this->url->setStaticBaseUri('/');
    $this->assets->addCss('css/application.css');
  }

  public function insertAction()
  {
    if($this->request->isGet()){
      $user_commands = new Users();
      $user_commands->serial_id = $_GET["serial_id"];
      $user_commands->commands = $_GET["commands"];
      if(count($this->modelsManager->executeQuery("SELECT * FROM Users WHERE serial_id = :serial_id:", array(
        'serial_id' => $_GET['serial_id']
      )))>0){
        Users::find("serial_id='{$_GET['serial_id']}'")->delete();
        /*
        $this->modelsManager->executeQuery("DELETE FROM Users WHERE serial_id = :serial_id:", array(
          'v' => $_GET['serial_id']
        ));
        */
      }
      $user_commands->save();
    }
    $this->view->disable();
    $this->response->redirect("http://explainshell.eventstore.co.kr?serial_id=".$_GET['serial_id'], true);
  }

  public function getAction()
  {
    if($this->request->isGet()){
      $commands = $this->modelsManager->executeQuery("SELECT * FROM Users WHERE serial_id = :serial_id:", array(
        'serial_id' => $_GET['serial_id']
      ));
    }
    $this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_ACTION_VIEW);
    $this->view->setVar('commands',$commands);
    $this->view->start()->render("commands", 'get');
  }
}

