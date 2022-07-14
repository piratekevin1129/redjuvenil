<?php

// No direct access to this file
defined('_JEXEC') or die('Restricted access');

class RedjuvenilViewRedjuvenil extends JViewLegacy{
	function display($tpl = null){
		// Assign data to the view
		$this->msg = 'Hello World';

		//$model = $this->getModel();
		
		////////beneficios 1//////////
		$db = JFactory::getDBO();
		$query_info1 = $db->getQuery(true);
		$query_info1->select($db->quoteName(array('id','regional','departamento','ciudad','tipo_identificacion','numero_identificacion','razon_social','nombre_comercial','especialidad','categoria','servicio','direccion','complemento_direccion','institucion','telefono','correo','sede_propia','fecha')));
		$query_info1->from($db->quoteName('#__redjuvenil_data'));
		//$query_info1->where($db->quoteName('enabled').' = '.$db->quote('yes'));
		$db->setQuery($query_info1);
		$this->items = $db->loadObjectList();

		// Display the view
		parent::display($tpl);

		$document = JFactory::getDocument();
		$document->setTitle("Red Juvenil Seguros SURA");
	}
}
