<?php

// No direct access to this file
defined('_JEXEC') or die('Restricted access');

class RedjuvenilViewRedjuvenil extends JViewLegacy{
	function display($tpl = null){
		// Assign data to the view
		$this->msg = 'Hello World';

		$model = $this->getModel();
		$datos = $model->getAll();

		$json_text = json_encode($datos, JSON_UNESCAPED_UNICODE);
		$this->items = $datos;
		
		////////beneficios 1//////////
		// Display the view
		parent::display($tpl);

		$document = JFactory::getDocument();
		$document->setTitle("Red Juvenil Seguros SURA");
	}
}
