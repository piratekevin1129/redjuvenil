<?php
defined('_JEXEC') or die('Restricted access');

class RedjuvenilController extends JControllerLegacy{
	public function obtenerDatos(){
		$r = checkComillas(JRequest::getVar('r','','post'));
		$d = checkComillas(JRequest::getVar('d','','post'));
		$c = checkComillas(JRequest::getVar('c','','post'));
		
		$model = $this->getModel();
		$datos = $model->getDatos($r,$d,$c);

		$json_text = json_encode($datos, JSON_UNESCAPED_UNICODE);
		
		exit($json_text);
	}

	public function datosIniciales(){

		$model = $this->getModel();
		$datos = $model->getAll();

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