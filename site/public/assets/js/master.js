function getE(idname){
    return document.getElementById(idname)
}

var i = 0;
var j = 0;
var k = 0;

function resetResults(key){
    getE('dpe-'+key+'-results').innerHTML = ''
}
function updateResults(key,values){
    var html = ''
    if(key=='departamento'){
        for(i = 0;i<items_data;i++){
            var item_data = items_data[i]
            if(item_data.regional==values[0]){
                html+='<div class="dpe-buscador-result" tag="'+setMinuscula(String(item_data.departamento).toLowerCase())+'" value="'+item_data.departamento+'" onclick="clickItemBuscador('+item_data.id+',this,'+"'departamento'"+')">'
                    html+='<p>'+item_data.departamento+'</p>'
                html+='</div>'
            }
        }
    }else if(key=='ciudad'){
        for(i = 0;i<items_data;i++){
            var item_data = items_data[i]
            if(item_data.departamento==values[0]){
                html+='<div class="dpe-buscador-result" tag="'+setMinuscula(String(item_data.ciudad).toLowerCase())+'" value="'+item_data.ciudad+'" onclick="clickItemBuscador('+item_data.id+',this,'+"'ciudad'"+')">'
                    html+='<p>'+item_data.ciudad+'</p>'
                html+='</div>'
            }
        }
    }else if(key=='nombre'){
        for(i = 0;i<items_data;i++){
            var item_data = items_data[i]
            if(item_data.ciudad==values[0]){
                html+='<div class="dpe-buscador-result" tag="'+setMinuscula(String(item_data.nombre).toLowerCase())+'" value="'+item_data.nombre+'" onclick="clickItemBuscador('+item_data.id+',this,'+"'nombre'"+')">'
                    html+='<p>'+item_data.nombre+'</p>'
                html+='</div>'
            }
        }
    }
    getE('dpe-'+key+'-results').innerHTML = html
}

function clickItemBuscador(id,div,key){
    getE('dpe-'+key+'-value').value = id
    getE('dpe-'+key+'-value').value = div.getAttribute('tag')
    getE('dpe-'+results+'-value').className = 'dpe-buscador-results-off'

    //actualizar los demás
    if(key=='regional'){
        //reiniciar los demás
        resetResults('departamento')
        resetResults('ciudad')
        resetResults('nombre')

        updateResults('departamento',[div.getAttribute('value')])
    }else if(key=='departamento'){
        //reiniciar los demás
        resetResults('ciudad')
        resetResults('nombre')

        updateResults('ciudad',[div.getAttribute('value')])
    }else if(key=='ciudad'){
        //reiniciar los demás
        resetResults('nombre')

        updateResults('nombre',[div.getAttribute('value')])
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
        getE('dpe-'+key+'-results').className = 'dpe-buscador-results-on'
    }else{
        getE('dpe-'+key+'-results').className = 'dpe-buscador-results-off'
    }
}

function selectItemBuscador(input,key){
    var texto = input.value
    if(!isempty(texto)){
        getE('dpe-'+key+'-results').className = 'dpe-buscador-results-on'
    }
}

function cancelCiudad(key){
    getE('dpe-'+key+'-value').value = ''
    getE('dpe-'+key+'-value2').value = ''
    getE('dpe-'+key+'-results').className = 'dpe-buscador-results-off'
}


/******************************************/


function buscarResultados(btn){
    //optener servicios seleccionados
    
    var regional_txt = getE('dpe-regional-value').value
    var departamento_txt = getE('dpe-departamento-value').value
    var ciudad_txt = getE('dpe-ciudad-value').value

    var nombre_txt = getE('dpe-nombre-value').value

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
        btn.getElementsByTagName('span')[0].innerHTML = 'BUSCANDO'
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
                c:ciudad_txt,
                n:nombre_txt
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
                    loadResults()
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
        h+='<div class="dpe-resultados-col">'+result_data.tipo_identificacion+result_data.numero_identificacion+'</div>'
        h+='<div class="dpe-resultados-col">'+result_data.razon_social+'</div>'
        h+='<div class="dpe-resultados-col">'+result_data.nombre_comercial+'</div>'
        h+='<div class="dpe-resultados-col">'+result_data.categoria+'</div>'
        h+='<div class="dpe-resultados-col"><button onclick="mostrarMas('+result_data[i].id+','+i+')" class="dpe-ver-servicios-btn">Ver más</button></div>'
        div_row.innerHTML = h

        getE('dpe-resultados-body').appendChild(div_row)
        
    }
    jQuery('html, body').animate({
        scrollTop: jQuery("#dpe-resultados-container").offset().top
        //scrollTop: 0
    }, 500);

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
