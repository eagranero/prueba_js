
/*
-El algoritmo es una agenda/asistente para nutricionistas que pregunta datos personales de pacientes para calcular su IMC(indice de masa corporal). 
Ademas, si dispone de informacion de porcentaje de grasa corporal y musculo esqueletico le indica el nivel en el que se encuentra.
-Presenta un menu para la carga de pacientes, conocer estado corporal de un paciente y para salir.
-Posee una clase para la creacion de objetos "paciente" y una array de objetos llamado "listaPacientes"
-Utilizo el localStorage de manera principal aunque dejo cargada la funcion para usar metodos GET para poder
descargar los datos desde un servidor.
*/

let nombre, apellido, dni, edad, peso, altura, sexo;
let imc;
let datosCorporales, grasaCorporal=0, musculo=0;
let cantidadNueva=0, consultaPaciente;
let listaPacientes= [],listaPacientesLocal= [], listaPacientesJSON= [];
let accion; let auxiliarResultado;

const archivoJSON = 'json/listapacientes.json'; //Direccion del archivo JSON de listado de pacientes 


//Descargo listado de pacientes guardado en LocalStorage (Si existe) y lo guardo en listado como objetos de clase paciente
listaPacientesLocal = JSON.parse(localStorage.getItem("listaPacientes")) || [];
listaPacientesLocal.forEach((p)=>{
    listaPacientes.push(new Paciente(p.nombre, p.apellido, p.dni, p.edad, p.peso, p.altura, p.sexo, p.grasaCorporal, p.musculo));
})
//--------------------------------------------------------------------------------------------


//Obtengo elementos del HTML------------------------------------------------------------------
let contenedorCarga = document.getElementById("contenedorCarga");
let contenedorBusqueda = document.getElementById("contenedorBusqueda");
let botonCargarPaciente=document.getElementById("botonCargarPaciente");
let botonBuscarPaciente=document.getElementById("botonBuscarPaciente");
let formularioBusqueda = document.getElementById("formularioBusqueda");
let resultadoBusqueda = document.getElementById("resultadoBusqueda");
let botonBuscar = document.getElementById("botonBorrar");
let resultado = document.getElementById("resultado");
//-------------------------------------------------------------------------------------------


// Habilito carga o busqueda de paciente segun menu-----------------------------------------------
botonCargarPaciente.addEventListener("click", ()=>{
    botonCargarPaciente.style.transform = "scale(1.2)";
    botonBuscarPaciente.style.transform = "scale(0.8)";
    contenedorCarga.style.display = "block";
    contenedorBusqueda.style.display = "none";
    resultadoBusqueda.style.display = "none";
});

botonBuscarPaciente.addEventListener("click", ()=>{
    botonCargarPaciente.style.transform = "scale(0.8)";
    botonBuscarPaciente.style.transform = "scale(1.2)";
    contenedorCarga.style.display = "none";
    contenedorBusqueda.style.display = "block";
    resultadoBusqueda.style.display = "none";
});
//------------------------------------------------------------------------------------------------


//Cargo nuevo paciente en funcion de los datos cargados en formulario--------------------------
let formularioCarga = document.getElementById("formularioCarga");
formularioCarga.addEventListener("submit", (e) => {
    e.preventDefault();
    nombre = document.getElementById("nombre");
    apellido = document.getElementById("apellido");
    dni = document.getElementById("dni");
    edad = document.getElementById("edad");
    sexo = document.getElementById("sexo");
    peso = document.getElementById("peso");
    altura = document.getElementById("altura");
    grasaCorporal = document.getElementById("grasaCorporal");
    musculo = document.getElementById("musculo");

    
    if(validarDatos(nombre.value, apellido.value, dni.value, edad.value, peso.value, altura.value, sexo.value.toLowerCase(), grasaCorporal.value, musculo.value)===0){
        indice = listaPacientes.findIndex( p => p.nombre.toLowerCase() == nombre.value.toLowerCase());
        if(indice>= 0 && listaPacientes[indice].dni == dni.value){//Si lo encuentro
            Toastify({
                text: "El paciente ya se encuentra cargado",
                duration: 3000,
                gravity: "top",
                style: {
                    background: "color(to right, #00b09b, #96c93d)",
                },
            }).showToast();
        
        //Si todo esta en orden y el paciente no ha sido cargado antes.
        }else{
            listaPacientes.push(new Paciente(nombre.value, apellido.value, dni.value, edad.value, peso.value, altura.value, sexo.value, grasaCorporal.value, musculo.value));
            localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes)); //Actualizo lista de pacientes en localstorage
            formularioCarga.reset();//Limpio formulario
            
            Toastify({
                text: "Paciente Cargado",
                duration: 3000,
                gravity: "top",
                style: {
                    background: "color(to right, #00b09b, #96c93d)",
                },
            }).showToast();
        }
        //---------------------------------
    } else{
        mostrarErrores(); //Muestro resultado de la validacion
    }
});
//---------------------------------------------------------------------------------------------------


//Busqueda de paciente por DNI-------------------------------------------------------------------
formularioBusqueda.addEventListener("submit", (e) => {
    e.preventDefault();
    let dniBuscar = document.getElementById("dniBuscar");
    
    //Comando para limpiar localStorage--------------------
    if (dniBuscar.value.toLowerCase() == "limpiar"){
        limpiarLocalStorage();
    }
    //------------------------------------------------------

    //Comando para leer JSON--------------------
    if (dniBuscar.value == "leer"){
        cargarJSONaLocalStorage();
    }
    //------------------------------------------------------


    //Busco indice de elemento buscado
    indice = listaPacientes.findIndex( p => p.dni == dniBuscar.value);
    
    if(indice>= 0 && listaPacientes[indice].dni == dniBuscar.value){//Si lo encuentro
        resultadoBusqueda.style.display = "block";    
        auxiliarResultado=
        `<ul>
        <li>Nombre y Apellido: ${listaPacientes[indice].nombre} ${listaPacientes[indice].apellido}.</li>
        <li>DNI: ${listaPacientes[indice].dni}.</li>
        <li>Edad: ${listaPacientes[indice].edad}.</li>
        <li>Peso: ${listaPacientes[indice].peso}.</li>
        <li>Altura: ${listaPacientes[indice].altura}.</li>
        <li>Sexo: ${listaPacientes[indice].sexo}.</li>
        <li>Grasa Corporal: ${listaPacientes[indice].grasaCorporal}.</li>
        <li>Musculo: ${listaPacientes[indice].musculo}.</li>
        <li>El paciente tiene un IMC de ${listaPacientes[indice].IMC} y tiene ${listaPacientes[indice].estadoIMC(listaPacientes[indice].IMC)}.</li>`;
        //Si poseo datos de Grasa Corporal y Musculo
        if(listaPacientes[indice].grasaCorporal>0 && listaPacientes[indice].musculo>0)
        auxiliarResultado+=`<li>El paciente tiene un nivel de grasa ${listaPacientes[indice].estadoGrasa(listaPacientes[indice].sexo,listaPacientes[indice].edad,listaPacientes[indice].grasaCorporal)}.</li>
        <li>El paciente tiene un nivel de musculo ${listaPacientes[indice].estadoMusculo(listaPacientes[indice].sexo,listaPacientes[indice].edad,listaPacientes[indice].musculo)}.</li>
        </ul>`;

        resultado.innerHTML = auxiliarResultado;
        botonBuscar.style.display = "block"; //Muestro boton de borrar
    }else{ //Si no lo encuentro
        resultadoBusqueda.style.display = "block";
        resultado.innerHTML = '<p>PACIENTE NO ENCONTRADO</p>'
        botonBuscar.style.display = "none"; //Oculto boton de borrar
    }

    formularioBusqueda.reset();
}) 

//Boton para borrar el paciente encontrado
resultadoBusqueda.addEventListener("click", (e) => {
    Swal.fire({
        title: `¿Seguro que desea eliminar el paciente con DNI ${listaPacientes[indice].dni}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            listaPacientes.splice(indice,1);
            localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes)); //Actualizo lista de pacientes en localstorage
            resultadoBusqueda.style.display = "block";
            resultado.innerHTML = '<p>PACIENTE BORRADO</p>'
            botonBuscar.style.display = "none"; //Oculto boton de borrar
        }
    }) 

})
//-------------------------------------------

//---------------------------------------------------------------------------------------------