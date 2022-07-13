<?php
defined ('_JEXEC') or die ("Acceso restringido");

//importamos la libreria de los modelos
jimport('joomla.application.component.modelitem');

//definimos la clase con el nombre del componente con la primera en mayuscula
class RedjuvenilModelRedjuvenil extends JModelList{
    public function getItems($table,$fields,$r,$d,$c,$n){
		$db = JFactory::getDbo();
		$query = $db->getQuery(true);

		$query->select($db->quoteName($fields));
		$query->from($db->quoteName($table));
        if(empty($n)){
            //buscar sin el nombre
            $query->where($db->quoteName('regional').' = '.$db->quote($r).' AND '.$db->quoteName('departamento').' = '.$db->quote($d).' AND '.$db->quoteName('ciudad').' = '.$db->quote($c));
        }else{
            $query->where($db->quoteName('regional').' = '.$db->quote($r).' AND '.$db->quoteName('departamento').' = '.$db->quote($d).' AND '.$db->quoteName('ciudad').' = '.$db->quote($c).' AND '.$db->quoteName('razon_social').' = '.$db->quote($n));
        }
		
		//$query->order('id ASC');

		$db->setQuery($query);
		$items = $db->loadObjectList();

		return $items;
	}
}

?>