<?php

class IndexController extends ControllerBase
{
  public function initialize()
  {
    $this->url->setStaticBaseUri('/');
    $this->view->setTemplateAfter('_nav_top');
  }

  public function indexAction()
  {
    $this->assets->addCss('css/application.css.scss');
  }
}

