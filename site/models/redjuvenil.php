<?php
defined ('_JEXEC') or die ("Acceso restringido");

//importamos la libreria de los modelos
jimport('joomla.application.component.modelitem');

//definimos la clase con el nombre del componente con la primera en mayuscula
class RedjuvenilModelRedjuvenil extends JModelItem{
    public function getDatos($r,$d,$c){
		$db = JFactory::getDbo();
		$query = $db->getQuery(true);

		$query->select($db->quoteName(array('id','regional','departamento','ciudad','tipo_identificacion','numero_identificacion','razon_social','nombre_comercial','especialidad','categoria','servicio','direccion','complemento_direccion','institucion','telefono','correo','sede_propia','fecha')));
		$query->from($db->quoteName('#__redjuvenil_data'));
        $query->where($db->quoteName('regional').' = '.$db->quote($r).' AND '.$db->quoteName('departamento').' = '.$db->quote($d).' AND '.$db->quoteName('ciudad').' = '.$db->quote($c));
        		
		//$query->order('id ASC');

		$db->setQuery($query);
		$items = $db->loadObjectList();

		return $items;
	}
}

?>