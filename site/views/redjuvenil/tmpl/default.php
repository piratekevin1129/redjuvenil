<?php
defined('_JEXEC') or die ("No puedes entrar aqui");

function setMinuscula($str){
    $str = str_replace('Á','á',$str);
    $str = str_replace('É','é',$str);
    $str = str_replace('Í','í',$str);
    $str = str_replace('Ó','ó',$str);
    $str = str_replace('Ú','ú',$str);
    $str = str_replace('Ñ','ñ',$str);
    return $str;
}

function unsanitice($text){
    $new_text = str_replace('--opentag--','<',$text);
    $new_text2 = str_replace('--closetag--','>',$new_text);
    $new_text3 = str_replace('--slash--','/',$new_text2);
    $new_text4 = str_replace('--doublequote--','"',$new_text3);
    $new_text5 = str_replace('--simplequote--',"'",$new_text4);

    return $new_text5;
}
?>

<!--Jquery-->
<!--<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>-->

<!--<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>-->

<!--Bootstrap-->
<!--CDN-->
<!--<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">    
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>-->

<!--FONT AWASOME-->
<!--<script src="http://kit.fontawesome.com/a6f44a68f2.js" crossorigin="anonymous"></script>-->

<!--Estilos propios-->
<link href="<?php echo JURI::base(); ?>/components/com_redjuvenil/public/assets/css/fonts.css" rel="stylesheet" type="text/css" />
<link href="<?php echo JURI::base(); ?>/components/com_redjuvenil/public/assets/css/master.css" rel="stylesheet" type="text/css" />
<link href="<?php echo JURI::base(); ?>/components/com_redjuvenil/public/assets/css/responsive.css" rel="stylesheet" type="text/css" />
<script>
    function setMinuscula(str){
        var str1 = str.replace(new RegExp('Á','g'),'á')
        var str2 = str1.replace(new RegExp('É','g'),'é')
        var str3 = str2.replace(new RegExp('Í','g'),'í')
        var str4 = str3.replace(new RegExp('Ó','g'),'ó')
        var str5 = str4.replace(new RegExp('Ú','g'),'ú')
        var str6 = str5.replace(new RegExp('Ñ','g'),'ñ')
        
        return str6;
    }
</script>

<!--COMPONENTE AQUIII-->
<div id="redjuvenil-content">
    <h1 class="dpe-main-title">Directorio Médico Póliza Juvenil</h1>
    <p class="dpe-text">Completa y selecciona este formulario para darte más información detallada.</p>

    <br />
    <br />

    <div class="dpe-form">
        <div class="dpe-form-group">
            <p class="dpe-buscador-label">Regional</p>
            <div class="dpe-buscador-input-cont">
                <div class="dpe-buscador-input" id="regional-field">
                    <div class="dpe-buscador-input-txt">
                        <input class="dpe-buscador-value" type="hidden" value="" id="dpe-regional-value" />
                        <input id="dpe-regional-value2" value="" placeholder="Selecciona una opción" type="text" maxlength="100" autocomplete="off" onkeyup="buscarItemBuscador(this,'regional')" onfocus="selectItemBuscador(this,'regional')" />
                        <button class="dpe-buscador-input-cancel" id="dpe-regional-input-cancel" onclick="cancelItemBuscador('regional')">
                            <span></span>
                        </button>
                    </div>
                    <div id="dpe-regional-results" class="dpe-buscador-results dpe-buscador-results-off">
                        
                    </div>
                </div>
            </div>
        </div>

        <br />

        <div class="dpe-form-group">
            <p class="dpe-buscador-label">Departamento</p>
            <div class="dpe-buscador-input-cont">
                <div class="dpe-buscador-input" id="departamento-field">
                    <div class="dpe-buscador-input-txt">
                        <input class="dpe-buscador-value" type="hidden" value="" id="dpe-departamento-value" />
                        <input id="dpe-departamento-value2" value="" placeholder="Seleccione una regional" type="text" maxlength="100" autocomplete="off" onkeyup="buscarItemBuscador(this,'departamento')" onfocus="selectItemBuscador(this,'departamento')" />
                        <button class="dpe-buscador-input-cancel" id="dpe-departamento-input-cancel" onclick="cancelItemBuscador('departamento')">
                            <span></span>
                        </button>
                    </div>
                    <div id="dpe-departamento-results" class="dpe-buscador-results dpe-buscador-results-off">
                        
                    </div>
                </div>
            </div>
        </div>

        <br />

        <div class="dpe-form-group">
            <p class="dpe-buscador-label">Ciudad o municipio</p>
            <div class="dpe-buscador-input-cont">
                <div class="dpe-buscador-input" id="ciudad-field">
                    <div class="dpe-buscador-input-txt">
                        <input class="dpe-buscador-value" type="hidden" value="" id="dpe-ciudad-value" />
                        <input id="dpe-ciudad-value2" value="" placeholder="Seleccione un departamento" type="text" maxlength="100" autocomplete="off" onkeyup="buscarItemBuscador(this,'ciudad')" onfocus="selectItemBuscador(this,'ciudad')" />
                        <button class="dpe-buscador-input-cancel" id="dpe-ciudad-input-cancel" onclick="cancelItemBuscador('ciudad')">
                            <span></span>
                        </button>
                    </div>
                    <div id="dpe-ciudad-results" class="dpe-buscador-results dpe-buscador-results-off">
                        
                    </div>
                </div>
            </div>
        </div>

        <br />

        <!--
        <div class="dpe-form-group">
            <p class="dpe-buscador-label">Nombre / razón social</p>
            <div class="dpe-buscador-input-cont">
                <div class="dpe-buscador-input" id="nombre-field">
                    <div class="dpe-buscador-input-txt">
                        <input class="dpe-buscador-value" type="hidden" value="" id="dpe-nombre-value" />
                        <input id="dpe-nombre-value2" value="" placeholder="" type="text" maxlength="100" autocomplete="off" onkeyup="buscarItemBuscador(this,'nombre')" onfocus="selectItemBuscador(this,'nombre')" />
                        <button class="dpe-buscador-input-cancel" id="dpe-nombre-input-cancel" onclick="cancelItemBuscador('nombre')">
                            <span></span>
                        </button>
                    </div>
                    <div id="dpe-nombre-results" class="dpe-buscador-results dpe-buscador-results-off">
                        
                    </div>
                </div>
            </div>
        </div>
        -->
    </div>

    <br />
    <button id="dpe-buscar-btn" class="dpe-buscar-btn-locked" onclick="buscarResultados(this)">
        <span></span>BUSCAR
    </button>
    <br />

    <div id="dpe-resultados-container">
        <div id="dpe-resultados-alert" class="dpe-resultados-off">
            <div><span></span>No se encontraron resultados con los datos suministrados</div>
        </div>

        <div id="dpe-resultados-loader" class="dpe-resultados-off"></div>

        <div id="dpe-resultados-table" class="dpe-resultados-off">
            <div class="dpe-resultados-header">
                <div class="dpe-resultados-title">Identificación</div>
                <div class="dpe-resultados-title">Razón social</div>
                <div class="dpe-resultados-title">Categoría, servicio</div>
                <div class="dpe-resultados-title">Servicio Salud</div>
                <div class="dpe-resultados-title">Más detalles</div>
            </div>
            <div id="dpe-resultados-body">
                
            </div>
        </div>
    </div>


    <div id="modal-red" class="modal-red-off">
        <div id="modal-red-back" onclick="unsetModalRed()"></div>
        <div id="modal-red-box">
            <h1 id="modal-red-title">Detalles</h1>
            <div id="modal-red-tabla">
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Regional</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Departamento</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Ciudad</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Identificación</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Nombre Razón Social</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Nombre Comercial</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Especialidad</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Categoría Servicio</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Servicio Salud</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Dirección</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Complemento Dirección</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Institución Salud</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Teléfono Institución</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Correo Institución</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Ind Sede Propia</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
                <div class="modal-red-tabla-row">
                    <div class="modal-red-tabla-title">
                        <span></span><div><p>Fecha Alta Proveedor</p></div>
                    </div>
                    <div class="modal-red-tabla-description"></div>
                </div>
            </div>

            <button class="modal-red-btn" type="button" onclick="unsetModalRed()">CERRAR</button>
            
        </div>
    </div>
</div>
<!--FIN COMPONENTE--->
<br />
<br />

<script src="<?php echo JURI::base(); ?>components/com_redjuvenil/public/assets/js/master.js"></script>
<script>

var items_data = []
<?php for($i = 0;$i<count($this->items);$i++){?>
<?php $item_data = (array) $this->items[$i]; ?>
items_data.push({
    id:<?php echo $item_data['id']?>,
    regional:'<?php echo $item_data['regional']?>',
    departamento:'<?php echo $item_data['departamento']?>',
    ciudad:'<?php echo $item_data['ciudad']?>',
    tipo_identificacion:'<?php echo $item_data['tipo_identificacion']?>',
    numero_identificacion:'<?php echo $item_data['numero_identificacion']?>',
    razon_social:'<?php echo $item_data['razon_social']?>',
    nombre_comercial:'<?php echo $item_data['nombre_comercial']?>',
    especialidad:'<?php echo $item_data['especialidad']?>',
    categoria:'<?php echo $item_data['categoria']?>',
    servicio:'<?php echo $item_data['servicio']?>',
    direccion:'<?php echo $item_data['direccion']?>',
    complemento_direccion:'<?php echo $item_data['complemento_direccion']?>',
    institucion:'<?php echo $item_data['institucion']?>',
    telefono:'<?php echo $item_data['telefono']?>',
    correo:'<?php echo $item_data['correo']?>',
    sede_propia:'<?php echo $item_data['sede_propia']?>',
    fecha:'<?php echo $item_data['fecha']?>'
})
<?php }?>

function getItem(id){
    var ind = -1
    for(k = 0;k<items_data.length;k++){
        if(items_data[k].id==id){
            ind = k
        }
    }
    return ind
}

window.onload = function(){
    //resizeContainer()
    updateResults('regional',[])
}


</script>