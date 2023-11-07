let procesos = [];
let sumaProceso = 0;
let procesoEspera = []

function incremento(){
    let a = "";
    let b = "";


    for(let i = 0 ; i < procesos.length ;i++){
        a += '<input type="text" class="form-control" value="'+procesos[i].proceso +" , "+ procesos[i].tamanio + '">'
        b += '<option value="'+i+'">'+procesos[i].proceso +" , "+ procesos[i].tamanio +'</option>'
    }
    $('#p').html(a);
    $('#procesoAct').html(b);
}
function espera(){
    let b = "";

    for(let i = 0 ; i < procesoEspera.length ;i++){
        b += '<option value="'+i+'">'+procesoEspera[i].proceso +" , "+ procesoEspera[i].tamanio +'</option>'
    }

    $('#procesoEspera').html(b);
}

function limpiar(){
    $('#p').html("");
    $('#procesoAct').html("");
    $('#procesoEspera').html("");
    $('#contadorProcesos').val("");
    procesos = [];
    procesoEspera = [];
    sumaProceso = 0;
}

function terminarProceso(terminar){
    let arreglo2 = [];
    
    for(let i = 0 ; i < procesos.length ;i++){
        if(terminar == i){
            sumaProceso -= procesos[i].tamanio
           
        }else{
            arreglo2.push(procesos[i])
            
        }
    }
    procesos = arreglo2;
    incremento();
    $('#contadorProcesos').val(procesos.length);
}

$(document).ready(function () {
  $("#iniciar").click(function () {
    if((sumaProceso+parseInt($('#sel_size').val())) < 1025){
        procesos.push({
            proceso: $("#sel_proceso").val(),
            tamanio: $("#sel_size").val(),
        });
        sumaProceso += parseInt($('#sel_size').val())
    }else{
        procesoEspera.push({
            proceso: $("#sel_proceso").val(),
            tamanio: $("#sel_size").val(),
        });
        alert("Sin espacio")
    }
    incremento();
    $('#contadorProcesos').val(procesos.length);
    espera();
  });

  $("#Reiniciar").click(function(){
    limpiar();
  });

  $("#Terminar").click(function(){
    terminarProceso($('#procesoAct').val());
  })
});

