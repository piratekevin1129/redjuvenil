function getE(idname){
    return document.getElementById(idname)
}

var i = 0;
var j = 0;
var k = 0;

function resetResults(key){
    getE('dpe-'+key+'-results').innerHTML = ''
    getE('dpe-'+key+'-value').value = ''
    getE('dpe-'+key+'-value2').value = ''
}
function inArray(haystack,needle){
    var is_in_array = false
    for(var e = 0;e<haystack.length;e++){
        if(haystack[e]==needle){
            is_in_array = true
        }
    }
    return is_in_array
}
function updateResults(key,values){
    var html = ''
    var repetidos = []

    if(key=='regional'){
        for(i = 0;i<items_data.length;i++){
            var item_data = items_data[i]
            if(!inArray(repetidos,item_data.regional)){
                html+='<div class="dpe-buscador-result" tag="'+setMinuscula(String(item_data.regional).toLowerCase())+'" value="'+item_data.regional+'" onclick="clickItemBuscador('+item_data.id+',this,'+"'regional'"+')">'
                    html+='<p>'+item_data.regional+'</p>'
                html+='</div>'
                repetidos.push(item_data.regional)
            }
        }
    }else if(key=='departamento'){
        for(i = 0;i<items_data.length;i++){
            var item_data = items_data[i]
            if(item_data.regional==values[0]){
                if(!inArray(repetidos,item_data.departamento)){
                    html+='<div class="dpe-buscador-result" tag="'+setMinuscula(String(item_data.departamento).toLowerCase())+'" value="'+item_data.departamento+'" onclick="clickItemBuscador('+item_data.id+',this,'+"'departamento'"+')">'
                        html+='<p>'+item_data.departamento+'</p>'
                    html+='</div>'
                    repetidos.push(item_data.departamento)
                }
            }
        }
    }else if(key=='ciudad'){
        for(i = 0;i<items_data.length;i++){
            var item_data = items_data[i]
            if(item_data.departamento==values[0]){
                if(!inArray(repetidos,item_data.ciudad)){
                    html+='<div class="dpe-buscador-result" tag="'+setMinuscula(String(item_data.ciudad).toLowerCase())+'" value="'+item_data.ciudad+'" onclick="clickItemBuscador('+item_data.id+',this,'+"'ciudad'"+')">'
                        html+='<p>'+item_data.ciudad+'</p>'
                    html+='</div>'
                    repetidos.push(item_data.ciudad)
                }
            }
        }
    }else if(key=='nombre'){
        for(i = 0;i<items_data.length;i++){
            var item_data = items_data[i]
            if(item_data.ciudad==values[0]){
                //console.log(item_data.razon_social)
                //if(!inArray(repetidos,item_data.razon_social)){
                    html+='<div class="dpe-buscador-result" tag="'+setMinuscula(String(item_data.razon_social).toLowerCase())+'" value="'+item_data.razon_social+'" onclick="clickItemBuscador('+item_data.id+',this,'+"'nombre'"+')">'
                        html+='<p>'+item_data.razon_social+'</p>'
                    html+='</div>'
                    //repetidos.push(item_data.razon_social)
                //}
            }
        }
    }
    getE('dpe-'+key+'-results').innerHTML = html
}

function clickItemBuscador(id,div,key){
    getE('dpe-'+key+'-value').value = id
    getE('dpe-'+key+'-value2').value = div.getAttribute('value')
    getE('dpe-'+key+'-results').className = 'dpe-buscador-results dpe-buscador-results-off'

    //actualizar los demás
    if(key=='regional'){
        //reiniciar los demás
        resetResults('departamento')
        resetResults('ciudad')

        updateResults('departamento',[div.getAttribute('value')])
        getE('dpe-departamento-value2').focus()
    }else if(key=='departamento'){
        //reiniciar los demás
        resetResults('ciudad')

        updateResults('ciudad',[div.getAttribute('value')])
        getE('dpe-ciudad-value2').focus()
    }else if(key=='ciudad'){
        
        //updateResults('nombre',[div.getAttribute('value')])
        //getE('dpe-nombre-value2').focus()
    }

    //comprobar que si haya valor en los 3
    var val_regional = getE('dpe-regional-value').value
    var val_departamento = getE('dpe-departamento-value').value
    var val_ciudad = getE('dpe-ciudad-value').value
    if(isempty(val_regional)||isempty(val_departamento)||isempty(val_ciudad)){
        getE('dpe-buscar-btn').className = 'dpe-buscar-btn-locked'
        getE('dpe-buscar-btn').disabled = true
    }else{
        getE('dpe-buscar-btn').classList.remove('dpe-buscar-btn-locked')
        getE('dpe-buscar-btn').disabled = false
    }
}

function buscarItemBuscador(input,key){
    var texto = input.value
    if(!isempty(texto)){
        var items_div = getE('dpe-'+key+'-results').getElementsByClassName('dpe-buscador-result')
        //set all hidde
        for(i = 0;i<items_div.length;i++){
            items_div[i].className = 'dpe-buscador-result dpe-buscador-result-hidden'
        }

        for(i = 0;i<items_div.length;i++){
            var tag1 = items_div[i].getAttribute('tag')
            var tag = htmlscope(tag1)
            var txt_min = texto.toLowerCase()
            var texto_min = htmlscope(txt_min)

            if(tag.indexOf(texto_min)!=-1){
                items_div[i].className = 'dpe-buscador-result'
            }
        }
        getE('dpe-'+key+'-results').className = 'dpe-buscador-results dpe-buscador-results-on'
    }else{
        getE('dpe-'+key+'-results').className = 'dpe-buscador-results dpe-buscador-results-off'
    }
}

function selectItemBuscador(input,key){
    var texto = input.value

    //mirar opciones del result
    var opciones = getE('dpe-'+key+'-results').getElementsByClassName('dpe-buscador-result')
    //if(!isempty(texto)){
    if(opciones.length>0){
        getE('dpe-'+key+'-results').className = 'dpe-buscador-results dpe-buscador-results-on'
    }
    //}
    getE(key+'-field').classList.add('dpe-buscador-input-selected')
}

function cancelItemBuscador(key){
    getE('dpe-'+key+'-value').value = ''
    getE('dpe-'+key+'-value2').value = ''
    getE('dpe-'+key+'-results').className = 'dpe-buscador-results dpe-buscador-results-off'
    getE(key+'-field').classList.remove('dpe-buscador-input-selected')
}


/******************************************/


function buscarResultados(btn){
    //optener servicios seleccionados
    
    var regional_txt = getE('dpe-regional-value2').value
    var departamento_txt = getE('dpe-departamento-value2').value
    var ciudad_txt = getE('dpe-ciudad-value2').value
    //var nombre_txt = getE('dpe-nombre-value').value

    var error_txt = ""
    if(isempty(regional_txt)){
        error_txt = 'Debes seleccionar una regional'
    }
    if(isempty(departamento_txt)){
        error_txt = 'Debes seleccionar un departamento'
    }
    if(isempty(ciudad_txt)){
        error_txt = 'Debes seleccionar una ciudad'
    }

    if(error_txt!=""){
        setAlertText('dpe-resultados-alert','<span></span> '+error_txt)
    }else{
        btn.innerHTML = '<span></span>BUSCANDO'
        getE('dpe-resultados-alert').className = 'dpe-resultados-off'
        getE('dpe-resultados-loader').className = 'dpe-resultados-on'
        getE('dpe-resultados-table').className = 'dpe-resultados-off'

        jQuery.ajax({
            type:'POST',
            dataType: "jsonp",
            url:'index.php?option=com_redjuvenil&task=obtenerDatos',
            data:{
                r:regional_txt,
                d:departamento_txt,
                c:ciudad_txt
            },
            success: function(result){
                btn.innerHTML = '<span></span>BUSCAR'
                getE('dpe-resultados-loader').className = 'dpe-resultados-off'

                //console.log(result)
                global_data = JSON.parse(result)
                if(global_data.length=='0'){
                    getE('dpe-resultados-alert').className = 'dpe-resultados-on'
                    setAlertText('dpe-resultados-alert','No se encontraron resultados con estas características')
                }else{
                    getE('dpe-resultados-table').className = 'dpe-resultados-on'
                    loadResults()
                }
            },
            error: function(xhr){
                btn.innerHTML = '<span></span>BUSCAR'
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
                        loadResults()
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

var global_data = null
function loadResults(){
    getE('dpe-resultados-body').innerHTML = ''
    
    for(i = 0;i<global_data.length;i++){
        var div_row = document.createElement('div')
        div_row.className = 'dpe-resultados-row'
        var h = ''
        
        var result_data = global_data[i]
        h+='<div class="dpe-resultados-col">'+result_data.tipo_identificacion+'-'+result_data.numero_identificacion+'</div>'
        h+='<div class="dpe-resultados-col">'+result_data.razon_social+'</div>'
        h+='<div class="dpe-resultados-col">'+result_data.categoria+'</div>'
        h+='<div class="dpe-resultados-col">'+result_data.servicio+'</div>'
        h+='<div class="dpe-resultados-col"><button onclick="mostrarMas('+result_data.id+','+i+')" class="dpe-ver-servicios-btn">Ver más</button></div>'
        div_row.innerHTML = h

        getE('dpe-resultados-body').appendChild(div_row)
        
    }
    jQuery('html, body').animate({
        scrollTop: jQuery("#dpe-resultados-container").offset().top
        //scrollTop: 0
    }, 500);
}

function mostrarMas(id,ind){
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[0].innerHTML = global_data[ind].regional
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[1].innerHTML = global_data[ind].departamento
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[2].innerHTML = global_data[ind].ciudad
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[3].innerHTML = global_data[ind].tipo_identificacion+'-'+global_data[ind].numero_identificacion
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[4].innerHTML = global_data[ind].razon_social
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[5].innerHTML = global_data[ind].nombre_comercial
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[6].innerHTML = global_data[ind].especialidad
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[7].innerHTML = global_data[ind].categoria
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[8].innerHTML = global_data[ind].servicio
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[9].innerHTML = global_data[ind].direccion
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[10].innerHTML = global_data[ind].complemento_direccion
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[11].innerHTML = global_data[ind].institucion
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[12].innerHTML = global_data[ind].telefono
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[13].innerHTML = global_data[ind].correo
    if(global_data[ind].sede_propia=='N'){
        getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[14].innerHTML = 'NO'
    }else{
        getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[14].innerHTML = 'SI'
    }
    getE('modal-red-tabla').getElementsByClassName('modal-red-tabla-description')[15].innerHTML = global_data[ind].fecha

    getE('modal-red').className = 'modal-red-on'
}

function unsetModalRed(){
    getE('modal-red').className = 'modal-red-off'
}

function setAlertText(idname,msg){
    getE(idname).innerHTML = '<div><span></span>'+msg+'</div>'
}

function IsJsonString(str){
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
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

function parseHtmlEntities(str){
    var txta = document.createElement('textarea');
	txta.innerHTML = str;
    var value = txta.value
    txta = null
	return value;
    
}
