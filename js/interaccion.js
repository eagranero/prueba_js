
/*
-El algoritmo es una agenda/asistente para nutricionistas que pregunta datos personales de pacientes para calcular su IMC(indice de masa corporal). 
Ademas, si dispone de informacion de porcentaje de grasa corporal y musculo esqueletico le indica el nivel en el que se encuentra.
-Presenta un menu para la carga de pacientes, conocer estado corporal de un paciente y para salir.
-Posee una clase para la creacion de objetos "paciente" y una array de objetos llamado "listaPacientes"
*/

let nombre, apellido, edad, peso, altura, sexo;
let imc;
let datosCorporales, grasaCorporal=0, musculo=0;
let cantidadNueva=0, consultaPaciente;
let listaPacientes= [],listaPacientesLocal= [], listaPacientesJSON= [];
let accion;

const JSON_GET = 'json/listapacientes.json'; //Direccion del archivo JSON de listado de pacientes 

//FUNCION PARA CARGAR PACIENTES DESDE ARCHIVO JSON LOCAL---------
/*Para cargar pacientes desde archivo JSON local debe dirigirse al apartado "BUSCAR", colocar "leer"
en en el casillero y presionar en "Buscar Paciente". Este comando cargara los pacientes almacenados 
en archivo.*/
function getPacientes_JSON(archivoJSON){
    fetch(archivoJSON)
    .then(resultado => resultado.json())
    .then(respuesta => {
        respuesta.forEach((p)=>{
            listaPacientes.push(new Paciente(p.nombre, p.apellido, p.edad, p.peso, p.altura, p.sexo, p.grasaCorporal, p.musculo));
        })
        localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes));
    })
}
//---------------------------------------------------------------


//Descargo listado de pacientes guardado en LocalStorage (Si existe) y lo guardo en listado como objetos de clase paciente
listaPacientesLocal = JSON.parse(localStorage.getItem("listaPacientes")) || [];
listaPacientesLocal.forEach((p)=>{
    listaPacientes.push(new Paciente(p.nombre, p.apellido, p.edad, p.peso, p.altura, p.sexo, p.grasaCorporal, p.musculo));
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
    console.log("cargar paciente");
    botonCargarPaciente.style.transform = "scale(1.2)";
    botonBuscarPaciente.style.transform = "scale(0.8)";
    contenedorCarga.style.display = "block";
    contenedorBusqueda.style.display = "none";
    resultadoBusqueda.style.display = "none";
});

botonBuscarPaciente.addEventListener("click", ()=>{
    console.log("buscar paciente");
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
    console.log("Formulario Enviado");
    nombre = document.getElementById("nombre");
    apellido = document.getElementById("apellido");
    edad = document.getElementById("edad");
    sexo = document.getElementById("sexo");
    peso = document.getElementById("peso");
    altura = document.getElementById("altura");
    grasaCorporal = document.getElementById("grasaCorporal");
    musculo = document.getElementById("musculo");

    
    if(validarDatos(nombre.value, apellido.value, edad.value, peso.value, altura.value, sexo.value.toLowerCase(), grasaCorporal.value, musculo.value)===0){
        indice = listaPacientes.findIndex( p => p.nombre.toLowerCase() == nombre.value.toLowerCase());
        if(indice>= 0 && listaPacientes[indice].nombre.toLowerCase() == nombre.value.toLowerCase()){//Si lo encuentro
            console.log(nombre.value);
            Toastify({
                text: "El paciente ya se encuentra cargado",
                duration: 3000,
                gravity: "top",
                style: {
                    background: "color(to right, #00b09b, #96c93d)",
                },
            }).showToast();
        
        //Si todo esta en orden cargo.
        }else{
            listaPacientes.push(new Paciente(nombre.value, apellido.value, edad.value, peso.value, altura.value, sexo.value, grasaCorporal.value, musculo.value));
            listaPacientes.forEach((p)=>{console.log(p)})

            localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes)); //Actualizo lista de pacientes en localstorage

            formularioCarga.reset();//Limpio formulario
            
            //Notificacion de paciente cargado (Se remplazo notifiacion anterior que modificaba el DOM, pienso que asi queda mejor)
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
        mostrarErrores();
    }
});
//---------------------------------------------------------------------------------------------------


//Busqueda de paciente por nombre-------------------------------------------------------------------
formularioBusqueda.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Buscando paciente");
    let nombreBuscar = document.getElementById("nombreBuscar");
    
    //Comando para limpiar localStorage--------------------
    if (nombreBuscar.value.toLowerCase() == "limpiar"){
        Swal.fire({
            title: '¿Seguro que desea eliminar el registro de pacientes en el LocalStorage?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
                localStorage.clear();
                location.reload();
            }
        })     
    }
    //------------------------------------------------------

    //Comando para leer JSON--------------------
    if (nombreBuscar.value.toLowerCase() == "leer"){
        Swal.fire({
            title: '¿Seguro que desea cargar el registro de pacientes del archivo JSON?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cargar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
                getPacientes_JSON(JSON_GET);
                location.reload();
            }
        })  
    }
    //------------------------------------------------------


    //Busco indice de elemento buscado
    indice = listaPacientes.findIndex( p => p.nombre.toLowerCase() == nombreBuscar.value.toLowerCase());
    console.log(indice);
    
    if(indice>= 0 && listaPacientes[indice].nombre.toLowerCase() == nombreBuscar.value.toLowerCase()){//Si lo encuentro
        console.log("Encontrado");
        resultadoBusqueda.style.display = "block";
        resultado.innerHTML =
        `<ul>
        <li>Nombre y Apellido: ${listaPacientes[indice].nombre} ${listaPacientes[indice].apellido}.</li>
        <li>Edad: ${listaPacientes[indice].edad}.</li>
        <li>Peso: ${listaPacientes[indice].peso}.</li>
        <li>Altura: ${listaPacientes[indice].altura}.</li>
        <li>Sexo: ${listaPacientes[indice].sexo}.</li>
        <li>Grasa Corporal: ${listaPacientes[indice].grasaCorporal}.</li>
        <li>Musculo: ${listaPacientes[indice].musculo}.</li>
        <li>El paciente tiene un IMC de ${listaPacientes[indice].IMC} y tiene ${listaPacientes[indice].estadoIMC(listaPacientes[indice].IMC)}.</li>
        <li>El paciente tiene un nivel de grasa ${listaPacientes[indice].estadoGrasa(listaPacientes[indice].sexo,listaPacientes[indice].edad,listaPacientes[indice].grasaCorporal)}.</li>
        <li>El paciente tiene un nivel de musculo ${listaPacientes[indice].estadoMusculo(listaPacientes[indice].sexo,listaPacientes[indice].edad,listaPacientes[indice].musculo)}.</li>
        </ul>`;
        botonBuscar.style.display = "block"; //Muestro boton de borrar
    }else{ //Si no lo encuentro
        console.log("Paciente no encontrado");
        resultadoBusqueda.style.display = "block";
        resultado.innerHTML = '<p>PACIENTE NO ENCONTRADO</p>'
        botonBuscar.style.display = "none"; //Oculto boton de borrar
    }

    formularioBusqueda.reset();
}) 

//Boton para borrar el paciente encontrado
resultadoBusqueda.addEventListener("click", (e) => {
    
    console.log(listaPacientes.length);

    Swal.fire({
        title: `¿Seguro que desea eliminar el paciente ${listaPacientes[indice].nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            listaPacientes.splice(indice,1);
            localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes)); //Actualizo lista de pacientes en localstorage
            console.log(listaPacientes);
            console.log(listaPacientes.length);

            resultadoBusqueda.style.display = "block";
            resultado.innerHTML = '<p>PACIENTE BORRADO</p>'
            botonBuscar.style.display = "none"; //Oculto boton de borrar
        }
    }) 

})
//-------------------------------------------

//---------------------------------------------------------------------------------------------