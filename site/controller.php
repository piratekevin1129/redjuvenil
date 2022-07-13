<?php
defined('_JEXEC') or die('Restricted access');

class RedjuvenilController extends JControllerLegacy{
	public function obtenerDatos(){
		$r = checkComillas(JRequest::getVar('r','','post'));
		$d = checkComillas(JRequest::getVar('d','','post'));
		$c = checkComillas(JRequest::getVar('c','','post'));
		$n = checkComillas(JRequest::getVar('n','','post'));
		
		$tablename = '#__redjuvenil_data';
		$titles = array('id','regional','departamento','ciudad','tipo_identificacion','numero_identificacion','razon_social','nombre_comercial','especialidad','categoria','servicio','direccion','complemento_direccion','institucion','telefono','correo','sede_propia','fecha');
		
		$model = $this->getModel();
		$datos = $model->getItems($tablename,$titles,$r,$d,$c,$n);

		$json_text = json_encode($datos, JSON_UNESCAPED_UNICODE);
		
		exit($json_text);
	}
}

function checkComillas($cadeneta){
	$cadena_nueva = str_replace("&","y",$cadeneta);
	//$cadena_nueva = str_replace("$","",$cadena_nueva);
	$cadena_nueva = str_replace("%","",$cadena_nueva);
	$cadena_nueva = str_replace("\\","/",$cadena_nueva);
	$cadena_nueva = str_replace("'",".",$cadena_nueva);
	$cadena_nueva = str_replace('"',"",$cadena_nueva);
	$cadena_nueva = str_replace('<',"",$cadena_nueva);
	$cadena_nueva = str_replace('>',"",$cadena_nueva);
	
	return strip_tags($cadena_nueva);
}