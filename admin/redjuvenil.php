<?php
jimport('joomla.application.component.controller');

$controller = JControllerLegacy::getInstance('redjuvenil');

// Perform the Request task
$controller->execute(JRequest::getCmd('task'));

// Redirect if set by the controller
$controller->redirect();