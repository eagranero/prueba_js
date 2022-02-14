
/*
-El algoritmo es una especie de agenda/asistente para nutricionistas que pregunta datos personales de pacientes para calcular su IMC(indice de masa corporal). 
Ademas, si dispone de informacion de porcentaje de grasa corporal y musculo esqueletico le indica el nivel en el que se encuentra.
-Presenta un menu para la carga de pacientes, conocer estado corporal de un paciente y para salir.
-Posee una clase para la creacion de objetos "paciente" y una array de objetos llamado "listaPacientes"
-Uso alert para mostrar el resultado por pantalla y console.log para que quede guardado todo el historico de 
la sesion.
-La idea con este asistente es que pueda inclusive generar un informe completo para el paciente que incluya un plan alimentario personalizado a partir de los datos que se carguen.
*/

let nombre, edad, peso, altura, sexo;
let imc;
let datosCorporales, grasaCorporal=0, musculo=0;
let cantidadNueva=0, consultaPaciente;
const listaPacientes= [];
let accion;

//------DEFINICION DE LA CLASE PACIENTE-------------------------------------------
class Paciente{
    constructor (nombre, apellido, edad, peso, altura, sexo, grasaCorporal, musculo){
        this.nombre = nombre;
        this.nombre = apellido;
        this.edad   = edad;
        this.peso   = peso;
        this.altura   = altura;
        this.sexo  = sexo;
        this.grasaCorporal = grasaCorporal;
        this.musculo = musculo;
        this.IMC = (Math.trunc(100*(peso/(Math.pow(altura,2)))))/100; //trunco valor de IMC a 2 decimales
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
            console.log(`Tu nivel de grasa es ${this.estadoGrasa(this.sexo, this.edad, this.grasaCorporal)}`);
            alert(`Tu nivel de grasa es ${this.estadoGrasa(this.sexo, this.edad, this.grasaCorporal)}`);
            console.log(`Tu nivel de musculo es ${this.estadoMusculo(this.sexo, this.edad, this.musculo)}`);
            alert(`Tu nivel de musculo es ${this.estadoMusculo(this.sexo, this.edad, this.musculo)}`);
        }
    }
    //------------------------------------------------------
}
//------------------------------------------------------------------------------------------


// Habilito carga o busqueda de paciente segun menu---------------------------------------------
let contenedorCarga = document.getElementById("contenedorCarga");
let contenedorBusqueda = document.getElementById("contenedorBusqueda");
let botonCargarPaciente=document.getElementById("botonCargarPaciente");
botonCargarPaciente.addEventListener("click", ()=>{
    console.log("cargar paciente");
    contenedorCarga.style.display = "block";
    contenedorBusqueda.style.display = "none";
    resultadoBusqueda.style.display = "none";
});
let botonBuscarPaciente=document.getElementById("botonBuscarPaciente");
botonBuscarPaciente.addEventListener("click", ()=>{
    console.log("buscar paciente");
    contenedorCarga.style.display = "none";
    contenedorBusqueda.style.display = "block";
    resultadoBusqueda.style.display = "none";
});
//------------------------------------------------------------------------------------------------

//Cargo array de pacientes en funcion de los datos cargados en formulario--------------------------
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
    listaPacientes.push(new Paciente(nombre.value, apellido.value, edad.value, peso.value, altura.value, sexo.value, grasaCorporal.value, musculo.value));
    listaPacientes.forEach((p)=>{console.log(p)})
    formularioCarga.reset();
});
//---------------------------------------------------------------------------------------------------


//Busqueda de paciente por nombre-------------------------------------------------------------------
let formularioBusqueda = document.getElementById("formularioBusqueda");
let resultadoBusqueda = document.getElementById("resultadoBusqueda");
formularioBusqueda.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Buscando paciente");
    nombre = document.getElementById("nombreBuscar");
    listaPacientes.forEach((p)=>{
        if(p.nombre.toLowerCase() == nombre.value.toLowerCase()){
            console.log("Encontrado");
            p.estadoCorporal();
            resultadoBusqueda.style.display = "block";
            resultadoBusqueda.innerHTML = 
            `<ul>
                <li>${p.nombre} ${p.apellido}.</li>
                <li>${p.edad}.</li>
                <li>${p.peso}.</li>
                <li>${p.altura}.</li>
                <li>${p.sexo}.</li>
                <li>${p.grasaCorporal}.</li>
                <li>${p.musculo}.</li>
            </ul>`;
        } 
    })
    formularioBusqueda.reset();
})  
//---------------------------------------------------------------------------------------------