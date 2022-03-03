
/*
-El algoritmo es una especie de agenda/asistente para nutricionistas que pregunta datos personales de pacientes para calcular su IMC(indice de masa corporal). 
Ademas, si dispone de informacion de porcentaje de grasa corporal y musculo esqueletico le indica el nivel en el que se encuentra.
-Presenta un menu para la carga de pacientes, conocer estado corporal de un paciente y para salir.
-Posee una clase para la creacion de objetos "paciente" y una array de objetos llamado "listaPacientes"
-Uso alert para mostrar el resultado por pantalla y console.log para que quede guardado todo el historico de 
la sesion.
-La idea con este asistente es que pueda inclusive generar un informe completo para el paciente que incluya un plan alimentario personalizado a partir de los datos que se carguen.
*/

let nombre, apellido, edad, peso, altura, sexo;
let imc;
let datosCorporales, grasaCorporal=0, musculo=0;
let cantidadNueva=0, consultaPaciente;
let listaPacientes= [],listaPacientesLocal= [];
let accion;

//------DEFINICION DE LA CLASE PACIENTE-------------------------------------------
class Paciente{
    constructor (nombre, apellido, edad, peso, altura, sexo, grasaCorporal, musculo){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.peso = peso;
        this.altura = altura;
        this.sexo = sexo;
        this.grasaCorporal = grasaCorporal;
        this.musculo = musculo;
        this.IMC = String((Math.trunc(100*(peso/(Math.pow(altura,2)))))/100); //trunco valor de IMC a 2 decimales
        this.fechaCarga= new Date();
    }
    //------METODOS PARA EVALUAR AL PACIENTE------------
    //Metodo para calificar el IMC
    estadoIMC(indice){
        if(indice<18.5 ) return "bajo peso"
        else if(indice>=18.5 && indice<25) return "peso normal"
        else if(indice>=25 && indice<30) return "sobre peso"
        else if(indice>30) return "obesidad"
        else return "error IMC"
    }
    //Metodo para calificar el estado de grasa corporal
    estadoGrasa(sexo, edad, grasaCorporal){

        if ((sexo.toLowerCase()) == "mujer"){
            switch (true){
                case(edad<20 || edad>=80):
                    return "indeterminable";
                    break;
                case (edad>=20 && edad<40):
                    if (grasaCorporal<21) return "bajo";
                    else if (grasaCorporal>=21 && grasaCorporal<33) return "normal";
                    else if (grasaCorporal>=33 && grasaCorporal<39) return "alto";
                    else if (grasaCorporal>=39) return "muy alto";
                    else return "error carga de grasa corporal";
                    break;
                case (edad>=40 && edad<60):
                    if (grasaCorporal<23) return "bajo";
                    else if (grasaCorporal>=23 && grasaCorporal<34) return "normal";
                    else if (grasaCorporal>=34 && grasaCorporal<40) return "alto";
                    else if (grasaCorporal>=40) return "muy alto";
                    else return "error carga de grasa corporal";
                    break;
                case (edad>=60 && edad<80):
                    if (grasaCorporal<24) return "bajo";
                    else if (grasaCorporal>=24 && grasaCorporal<36) return "normal";
                    else if (grasaCorporal>=36 && grasaCorporal<42) return "alto";
                    else if (grasaCorporal>=42) return "muy alto";
                    else return "error carga de grasa corporal";
                    break;
            }
        }else if ((sexo.toLowerCase()) == "hombre"){
            switch (true){
                case(edad<20 || edad>=80):
                    return "indeterminable";
                    break;
                case (edad>=20 && edad<40):
                    if (grasaCorporal<8) return "bajo";
                    else if (grasaCorporal>=8 && grasaCorporal<20) return "normal";
                    else if (grasaCorporal>=20 && grasaCorporal<25) return "alto";
                    else if (grasaCorporal>=25) return "muy alto";
                    else return "error carga de grasa corporal";
                    break;
                case (edad>=40 && edad<60):
                    if (grasaCorporal<11) return "bajo";
                    else if (grasaCorporal>=11 && grasaCorporal<22) return "normal";
                    else if (grasaCorporal>=22 && grasaCorporal<28) return "alto";
                    else if (grasaCorporal>=28) return "muy alto";
                    else return "error carga de grasa corporal";
                    break;
                case (edad>=60 && edad<80):
                    if (grasaCorporal<13) return "bajo";
                    else if (grasaCorporal>=13 && grasaCorporal<25) return "normal";
                    else if (grasaCorporal>=25 && grasaCorporal<30) return "alto";
                    else if (grasaCorporal>=30) return "muy alto";
                    else return "error carga de grasa corporal";
                    break;
            }
        }else return "error carga de sexo";
    }
    //Metodo para calificar el estado de musculo esqueletico
    estadoMusculo(sexo, edad, musculo){

        if ((sexo.toLowerCase()) == "mujer"){
            switch (true){
                case(edad<20 || edad>=80):
                    return "indeterminable";
                    break;
                case (edad>=20 && edad<40):
                    if (musculo<24.3) return "bajo";
                    else if (musculo>=24.3 && musculo<30.4) return "normal";
                    else if (musculo>=30.4 && musculo<35.4) return "alto";
                    else if (musculo>=35.4) return "muy alto";
                    else return "error carga de musculo";
                    break;
                case (edad>=40 && edad<60):
                    if (musculo<24.1) return "bajo";
                    else if (musculo>=24.1 && musculo<30.2) return "normal";
                    else if (musculo>=30.2 && musculo<35.2) return "alto";
                    else if (musculo>=35.2) return "muy alto";
                    else return "error carga de musculo";
                    break;
                case (edad>=60 && edad<80):
                    if (musculo<23.9) return "bajo";
                    else if (musculo>=23.9 && musculo<30) return "normal";
                    else if (musculo>=30 && musculo<35) return "alto";
                    else if (musculo>=35) return "muy alto";
                    else return "error carga de musculo";
                    break;
            }
        }else if ((sexo.toLowerCase()) == "hombre"){
            switch (true){
                case(edad<20 || edad>=80):
                    return "indeterminable";
                    break;
                case (edad>=20 && edad<40):
                    if (musculo<33.3) return "bajo";
                    else if (musculo>=33.3 && musculo<39.4) return "normal";
                    else if (musculo>=39.4 && musculo<44.1) return "alto";
                    else if (musculo>=44.1) return "muy alto";
                    else return "error carga de musculo";
                    break;
                case (edad>=40 && edad<60):
                    if (musculo<33.1) return "bajo";
                    else if (musculo>=33.1 && musculo<39.2) return "normal";
                    else if (musculo>=39.2 && musculo<43.9) return "alto";
                    else if (musculo>=43.9) return "muy alto";
                    else return "error carga de musculo";
                    break;
                case (edad>=60 && edad<80):
                    if (musculo<32.9) return "bajo";
                    else if (musculo>=32.9 && musculo<39) return "normal";
                    else if (musculo>=39 && musculo<43.7) return "alto";
                    else if (musculo>=43.7) return "muy alto";
                    else return "error carga de musculo";
                    break;
            }
        }else return "error carga de sexo";
    }
    //Metodo para conocer estado corporal completo
    estadoCorporal(){ 
        alert(`Tu IMC es de ${this.IMC} y tienes ${this.estadoIMC(this.IMC)}`);
        console.log(`Tu IMC es de ${this.IMC} y tienes ${this.estadoIMC(this.IMC)}`);
        if (this.grasaCorporal!=0 && this.musculo!=0){
            console.log(`El paciente tiene un nivel de grasa ${this.estadoGrasa(this.sexo, this.edad, this.grasaCorporal)}`);
            alert(`El paciente tiene un nivel de grasa ${this.estadoGrasa(this.sexo, this.edad, this.grasaCorporal)}`);
            console.log(`El paciente tiene un nivel de musculo ${this.estadoMusculo(this.sexo, this.edad, this.musculo)}`);
            alert(`El paciente tiene un nivel de musculo ${this.estadoMusculo(this.sexo, this.edad, this.musculo)}`);
        }
    }
    //------------------------------------------------------
}
//------------------------------------------------------------------------------------------


//Descargo listado de pacientes guardado en LocalStorage (Si existe) y lo guardo como objetos de clase paciente
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

    indice = listaPacientes.findIndex( p => p.nombre.toLowerCase() == nombre.value.toLowerCase());
    console.log(indice);

    //Si el nombre esta e blanco
    if (nombre.value===''){
    Toastify({
            text: "Nombre no cargado",
            duration: 3000,
            gravity: "top",
            style: {
            background: "color(to right, #00b09b, #96c93d)",
        },
    }).showToast();
    
    //Si el paciente ya se encuentra cargado
    }else if(indice>= 0 && listaPacientes[indice].nombre.toLowerCase() == nombre.value.toLowerCase()){//Si lo encuentro
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
    listaPacientes.splice(indice,1);
    localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes)); //Actualizo lista de pacientes en localstorage
    console.log(listaPacientes);
    console.log(listaPacientes.length);

    resultadoBusqueda.style.display = "block";
    resultado.innerHTML = '<p>PACIENTE BORRADO</p>'
    botonBuscar.style.display = "none"; //Oculto boton de borrar

})
//-------------------------------------------

//---------------------------------------------------------------------------------------------