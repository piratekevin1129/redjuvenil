function getE(idname){
    return document.getElementById(idname)
}

var i = 0;
var j = 0;
var k = 0;

function clickCiudad(id,div){
    getE('dpe-ciudad-value').value = id
    getE('dpe-ciudad-value2').value = div.getAttribute('tag')
    getE('dpe-ciudad-results').className = 'dpe-ciudad-results-off'
}

function buscarCiudad(input){
    var texto = input.value
    if(!isempty(texto)){
        var ciudades_div = getE('dpe-ciudad-results').getElementsByClassName('dpe-ciudad-result')
        //set all hidde
        for(i = 0;i<ciudades_div.length;i++){
            ciudades_div[i].className = 'dpe-ciudad-result dpe-ciudad-result-hidden'
        }

        for(i = 0;i<ciudades_div.length;i++){
            var tag1 = ciudades_div[i].getAttribute('tag')
            var tag = htmlscope(tag1)
            var txt_min = texto.toLowerCase()
            var texto_min = htmlscope(txt_min)

            if(tag.indexOf(texto_min)!=-1){
                ciudades_div[i].className = 'dpe-ciudad-result'
            }
        }
        getE('dpe-ciudad-results').className = 'dpe-ciudad-results-on'
    }else{
        getE('dpe-ciudad-results').className = 'dpe-ciudad-results-off'
    }
}

function selectCiudad(input){
    var texto = input.value
    if(!isempty(texto)){
        getE('dpe-ciudad-results').className = 'dpe-ciudad-results-on'
    }
}

function cancelCiudad(){
    getE('dpe-ciudad-value').value = ''
    getE('dpe-ciudad-value2').value = ''
    getE('dpe-ciudad-results').className = 'dpe-ciudad-results-off'
}

function clickBeneficio(radio){
    var checks = getE('dpe-beneficios-cont').getElementsByClassName('dpe-beneficio')
    for(i = 0;i<checks.length;i++){
        var check = checks[i]
        check.className = 'dpe-beneficio dpe-beneficio-unchecked'
        check.setAttribute('status','unchecked')
    }

    getE('dpe-beneficio-check-'+radio).className = 'dpe-beneficio dpe-beneficio-checked'
    getE('dpe-beneficio-check-'+radio).setAttribute('status','unchecked')
    getE('dpe-beneficios-cont').setAttribute('selected',radio)
}

function checkBeneficio(){
    var check = getE('dpe-beneficios-cont').getAttribute('selected')
    return check
}

function buscarResultados(btn){
    //optener servicios seleccionados
    
    var beneficio = checkBeneficio()
    var ciudad_txt = getE('dpe-ciudad-value').value

    //if(beneficio1==0&&beneficio2==0&&beneficio3==0&&beneficio4==0){
    if(beneficio==0||beneficio=='0'){
        setAlertText('dpe-resultados-alert','Debes seleccionar un beneficio')
    }else{
        if(isempty(ciudad_txt)){
            setAlertText('dpe-resultados-alert','Debes escribir el nombre de la ciudad')
        }else{
            btn.getElementsByTagName('span')[0].innerHTML = 'BUSCANDO'
            getE('dpe-resultados-alert').className = 'dpe-resultados-off'
            getE('dpe-resultados-loader').className = 'dpe-resultados-on'
            getE('dpe-resultados-table').className = 'dpe-resultados-off'

            jQuery.ajax({
                type:'POST',
                dataType: "jsonp",
                url:'index.php?option=com_diferenciadorpaceps&task=obtenerDatos',
                //url:'http://labwww.epssura.com/index.php?option=com_diferenciadorpaceps&task=obtenerDatos',
                data:{
                    b:Number(beneficio),
                    c:ciudad_txt
                },
                success: function(result){
                    btn.getElementsByTagName('span')[0].innerHTML = 'BUSCAR'
                    getE('dpe-resultados-loader').className = 'dpe-resultados-off'

                    //console.log(result)
                    global_data = JSON.parse(result)
                    if(global_data.length=='0'){
                        getE('dpe-resultados-alert').className = 'dpe-resultados-on'
                        setAlertText('dpe-resultados-alert','No se encontraron resultados con estas características')
                    }else{
                        getE('dpe-resultados-table').className = 'dpe-resultados-on'
                        loadResults(beneficio)
                    }
                },
                error: function(xhr){
                    btn.getElementsByTagName('span')[0].innerHTML = 'BUSCAR'
                    getE('dpe-resultados-loader').className = 'dpe-resultados-off'

                    var result = xhr.responseText
                    if(IsJsonString(result)){
                        //cargó los datos igualmente
                        global_data = JSON.parse(result)
                        if(global_data.length=='0'){
                            getE('dpe-resultados-alert').className = 'dpe-resultados-on'
                            setAlertText('dpe-resultados-alert','No se encontraron resultados con estas características')
                        }else{
                            getE('dpe-resultados-table').className = 'dpe-resultados-on'
                            loadResults(beneficio)
                            
                        }
                    }else{
                        getE('dpe-resultados-alert').className = 'dpe-resultados-on'
                        setAlertText('dpe-resultados-alert','Ocurrió un error leyendo los datos')
                    }
                    
                    console.log("----")
                    console.log(xhr.responseText)
                    console.log("----")
                }
            })
        }
    }
}

function setAlertText(idname,msg){
    getE(idname).innerHTML = '<div><span></span>'+msg+'</div>'
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var global_data = null
function loadResults(beneficio){
    getE('dpe-resultados-body').innerHTML = ''
    var ips_totales = 0
    for(i = 0;i<global_data.length;i++){
        //mirar si tiene al menos 1 si
        var beneficios_totales = 0
        if(global_data[i].beneficio1=='SI'){
            beneficios_totales++
        }
        if(global_data[i].beneficio2=='SI'){
            beneficios_totales++
        }
        if(global_data[i].beneficio3=='SI'){
            beneficios_totales++
        }
        if(global_data[i].beneficio4=='SI'){
            beneficios_totales++
        }
        if(global_data[i].beneficio5=='SI'){
            beneficios_totales++
        }
        if(global_data[i].beneficio6=='SI'){
            beneficios_totales++
        }
        if(global_data[i].beneficio7=='SI'){
            beneficios_totales++
        }
        if(global_data[i].beneficio8=='SI'){
            beneficios_totales++
        }
        if(global_data[i].beneficio9=='SI'){
            beneficios_totales++
        }
        if(global_data[i].beneficio10=='SI'){
            beneficios_totales++
        }

        if(beneficios_totales>0){
            var div_row = document.createElement('div')
            div_row.className = 'dpe-resultados-row'
            var h = ''
            var ciudad_name = ciudades_data[getCiudad(global_data[i].ciudad)].nombre
            h+='<div class="dpe-resultados-col">'+global_data[i].entidad+'</div>'
            h+='<div class="dpe-resultados-col">'+ciudad_name+'</div>'
            h+='<div class="dpe-resultados-col"><button onclick="mostrarBeneficios('+global_data[i].id+','+i+','+beneficio+')" class="dpe-ver-servicios-btn">Ver todos los servicios</button></div>'
            div_row.innerHTML = h
    
            getE('dpe-resultados-body').appendChild(div_row)
            ips_totales++
        }
    }
    jQuery('html, body').animate({
        scrollTop: jQuery("#dpe-window-1").offset().top
        //scrollTop: 0
    }, 500);

    if(ips_totales==0){
        getE('dpe-resultados-table').className = 'dpe-resultados-off'
        getE('dpe-resultados-alert').className = 'dpe-resultados-on'
        setAlertText('dpe-resultados-alert','No se encontraron resultados con estas características')
    }
}

var animacion_ventana = null
function mostrarBeneficios(id,ind,b){
    //global_data
    //console.log(global_data[ind].beneficio1)
    getE('dpe-title-entidad').innerHTML = global_data[ind].entidad

    getE('dpe-window-1').className = 'dpe-window-off'
    animacion_ventana = setTimeout(function(){
        clearTimeout(animacion_ventana)
        animacion_ventana = null

        getE('dpe-window-1').className = 'dpe-window-offf'

        //habilitar beneficio clickeado
        getE('dpe-convenios-container-1').className = 'dpe-convenios-container-off'
        getE('dpe-convenios-container-2').className = 'dpe-convenios-container-off'
        getE('dpe-convenios-container-3').className = 'dpe-convenios-container-off'
        getE('dpe-convenios-container-4').className = 'dpe-convenios-container-off'
        getE('dpe-convenios-container-5').className = 'dpe-convenios-container-off'

        getE('dpe-convenios-container-'+b).className = 'dpe-convenios-container-on'
        
        var beneficios = []
        beneficios = [global_data[ind].beneficio1,global_data[ind].beneficio2,global_data[ind].beneficio3,global_data[ind].beneficio4,global_data[ind].beneficio5,global_data[ind].beneficio6,global_data[ind].beneficio7,global_data[ind].beneficio8,global_data[ind].beneficio9,global_data[ind].beneficio10]
        
        //dehabilitar los que no
        var rows = getE('dpe-convenios-container-'+b).getElementsByClassName('dpe-convenio-row')
        var descs = getE('dpe-convenios-container-'+b).getElementsByClassName('dpe-convenio-desc')
        for(i = 0;i<rows.length;i++){//lo mismo que beneficios
            rows[i].className = 'dpe-convenio-row dpe-convenio-row-hidden'

            //ver mas y menos
            var vm = rows[i].getElementsByClassName('dpe-convenio-ver')[0]
            vm.className = 'dpe-convenio-ver dpe-convenio-no-ver'
        }
        for(i = 0;i<descs.length;i++){
            descs[i].innerHTML = ""
        }
        
        var ocultos = 0
        for(i = 0;i<beneficios.length;i++){
            if(beneficios[i]=='SI'&&rows[i].getAttribute('enabled')=='yes'){
                rows[i].className = 'dpe-convenio-row'
                descs[i].innerHTML = parseHtmlEntities(global_data[ind].descripcion)
            }else{
                ocultos++
            }
        }
        
        if(ocultos==beneficios.length){
            getE('dpe-resultados-alert2').className = 'dpe-resultados-on'
        }else{
            getE('dpe-resultados-alert2').className = 'dpe-resultados-off'
        }

        getE('dpe-window-2').className = 'dpe-window-onn'
        animacion_ventana = setTimeout(function(){
            clearTimeout(animacion_ventana)
            animacion_ventana = null

            getE('dpe-window-2').className = 'dpe-window-on'

            for(i = 0;i<beneficios.length;i++){
                if(beneficios[i]=='SI'){
                    //mirar si ponemos ver mas
                    var wrap = rows[i].getElementsByClassName('dpe-convenio-wrap')[0]
                    var ver = rows[i].getElementsByClassName('dpe-convenio-ver')[0]
                    console.log(wrap.offsetHeight)
                    if(wrap.offsetHeight>150){
                        ver.className = 'dpe-convenio-ver dpe-convenio-vermas'
                    }else{
                        ver.className = 'dpe-convenio-ver dpe-convenio-no-ver'
                    }
                }
            }

            jQuery('html, body').animate({
                scrollTop: 0
            }, 500);
        },10)

    },250)
}

function vermasConvenio(btn){
    var col = btn.parentNode
    col.className = 'dpe-convenio-ver dpe-convenio-vermenos'

    var wrap = col.parentNode
    var row = wrap.parentNode
    row.className = 'dpe-convenio-row dpe-convenio-row-hover'
}
function vermenosConvenio(btn){
    var col = btn.parentNode
    col.className = 'dpe-convenio-ver dpe-convenio-vermas'

    var wrap = col.parentNode
    var row = wrap.parentNode
    row.className = 'dpe-convenio-row'
}

function volverAtras(btn){
    getE('dpe-resultados-alert2').className = 'dpe-resultados-off'
    getE('dpe-window-2').className = 'dpe-window-off'
    animacion_ventana = setTimeout(function(){
        clearTimeout(animacion_ventana)
        animacion_ventana = null

        getE('dpe-window-2').className = 'dpe-window-offf'

        //habilitar beneficio clickeado
        getE('dpe-convenios-container-1').className = 'dpe-convenios-container-off'
        getE('dpe-convenios-container-2').className = 'dpe-convenios-container-off'
        getE('dpe-convenios-container-3').className = 'dpe-convenios-container-off'
        getE('dpe-convenios-container-4').className = 'dpe-convenios-container-off'
        getE('dpe-convenios-container-5').className = 'dpe-convenios-container-off'

        getE('dpe-window-1').className = 'dpe-window-onn'
        animacion_ventana = setTimeout(function(){
            clearTimeout(animacion_ventana)
            animacion_ventana = null

            getE('dpe-window-1').className = 'dpe-window-on'
            jQuery('html, body').animate({
                scrollTop: jQuery("#dpe-window-1").offset().top
                //scrollTop: 0
            }, 500);
        },50)

    },250)
}

function isempty(value){
    var value1 = value.trim()
    if(value1==""){
        return true
    }else{
        return false
    }
}

function htmlscope(txt){
    var t1 = txt.replace(new RegExp('á', 'g'),'a')
    var t2 = t1.replace(new RegExp('é', 'g'),'e')
    var t3 = t2.replace(new RegExp('í', 'g'),'i')
    var t4 = t3.replace(new RegExp('ó', 'g'),'o')
    var t5 = t4.replace(new RegExp('ú', 'g'),'u')
    var t6 = t5.replace(new RegExp('ü', 'g'),'u')
    return t6
}

function parseHtmlEntities(str) {
    var txta = document.createElement('textarea');
	txta.innerHTML = str;
    var value = txta.value
    txta = null
	return value;
    
}
