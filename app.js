let procesos = [];
let sumaProceso = 0;
let procesoEspera = [];

function incremento() {
  let b = "";
  let particion = 0;
  let cont = 0;
  for (let i = 0; i < procesos.length; i++) {
    particion = parseInt(procesos[i].tamanio) / 64; //4,1
    for (let j = cont; j < particion + cont; j++) {
      $("#proceso" + j).val(procesos[i].proceso + " | " + procesos[i].tamanio);
    }
    b += '<option value="' + i + '">' + procesos[i].proceso + " | " + procesos[i].tamanio + "</option>";
    cont += particion;
  }
  $("#procesoAct").html(b);
}
function espera() {
  let b = "";

  for (let i = 0; i < procesoEspera.length; i++) {
    b +='<option value="' + i + '">' + procesoEspera[i].proceso + " , " + procesoEspera[i].tamanio + "</option>";
  }
  $("#procesoEspera").html(b);
  $("#contadorProcesosEspera").val(procesoEspera.length);
}

function limpiar() {
  $("#procesoAct").html("");
  $("#procesoEspera").html("");
  $("#contadorProcesos").val(0);
  $("#contadorProcesosEspera").val(0);
  for (let i = 0; i < 16; i++) {
    $("#proceso" + i).val("");
  }
  procesos = [];
  procesoEspera = [];
  sumaProceso = 0;
}

function terminarProceso(terminar) {
  let arreglo2 = [];
  for (let i = 0; i < procesos.length; i++) {
    if (terminar == i) {
      sumaProceso -= procesos[i].tamanio;
      if(sumaProceso < 0){
        sumaProceso = 0;
      }
    } else {
      arreglo2.push(procesos[i]);
    }
  }
  procesos = arreglo2;
  arreglo2 = [];
  if (procesoEspera.length > 0) {
    procesos.push(procesoEspera[0]);
    for (let i = 0; i < procesoEspera.length; i++) {
      if (i != 0) {
        if ((sumaProceso + procesoEspera[i]) < 1025) {
          sumaProceso += procesoEspera[i];
          arreglo2.push(procesoEspera[i]);
        }
      }
    }
  }
  for (let i = 0; i < 16; i++) {
    $("#proceso" + i).val("");
  }
  procesoEspera = arreglo2;
  incremento();
  espera();
  $("#contadorProcesos").val(procesos.length);
}

$(document).ready(function () {
  $("#iniciar").click(function () {
    if (sumaProceso + parseInt($("#sel_size").val()) < 1025) {
      procesos.push({
        proceso: $("#sel_proceso").val(),
        tamanio: $("#sel_size").val(),
      });
      sumaProceso += parseInt($("#sel_size").val());
      console.log(sumaProceso)
    } else {
      procesoEspera.push({
        proceso: $("#sel_proceso").val(),
        tamanio: $("#sel_size").val(),
      });
    }
    incremento();
    $("#contadorProcesos").val(procesos.length);
    espera();
  });

  $("#Reiniciar").click(function () {
    limpiar();
  });

  $("#Terminar").click(function () {
    terminarProceso($("#procesoAct").val());
  });
});
