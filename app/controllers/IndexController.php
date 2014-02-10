<?php

require_once __DIR__.'/../../vendor/autoload.php';
require(__DIR__ . '/../../vendor/nategood/httpful/bootstrap.php');
use \Httpful\Request;

class IndexController extends ControllerBase
{
  public function initialize()
  {
    $this->url->setStaticBaseUri('/');
    $this->view->setTemplateAfter('_nav_top');
    $this->assets->addCss('css/application.css');
    $this->assets
      ->addJs('js/index/index.js')
      ->addJs('js/util/jquery-iframe-auto-height/release/jquery.browser.js')
      ->addJs('js/util/jquery-iframe-auto-height/release/jquery.iframe-auto-height.plugin.1.9.3.min.js');
    #$this->view->setViewsDir('app/views/');
  }

  public function indexAction($serial)
  {
    /*
    $command = $this->request->get("command");
    if($command)
    {
      $url = "http://explainshell.com/explain?cmd={$command}";
      $response = Request::get($url)->send();
      echo $response;
    }
    */

    $this->view->start();
    $this->view->render('index','index');
    $this->view->setVar("commands", $commands);
    $this->view->finish();
  }

  public function insertAction()
  {
  }
}

