<?php

defined('_JEXEC') or die;

jimport('joomla.application.component.controller');

class RedjuvenilController extends JControllerLegacy{

	//$base = str_replace('\\','/',JPATH_BASE)."/";
	//$base = str_replace('administrator/','',$base);

	function display($cachable = false, $urlparams = false){
		// set default view if not set
		JRequest::setVar('view', JRequest::getCmd('view', 'redjuvenil'));
		// call parent behavior
		parent::display($cachable);
		return $this;
	}

}