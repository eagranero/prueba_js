
/*
-El algoritmo pregunta al usuario datos personales para calcular su IMC(indice de masa corporal). 
Ademas, si dispone de informacion de porcentaje de grasa corporal y musculo esqueletico le indica el nivel en el que se encuentra.
-Al preguntar el nombre propone la sentencia "no" para salir del bucle.
-Uso alert para mostrar el resultado por pantalla y console.log para que quede guardado todo el historico de 
la sesion.
*/
let nombre, edad, peso, altura, sexo;
let imc;
let datosCorporales, grasaCorporal, musculo, resultadoGrasa, resultadoMusculo;

//Funcion para calcualr IMC
function calcularIMC(peso,altura){
    return peso/(Math.pow(altura,2));
}

//Funcion para calucular estado de grasa corporal
function estadoGrasa(sexo, edad, grasaCorporal){

    if ((sexo.toLowerCase()) == "mujer"){
        switch (true){
            case(edad<20 || edad>=80):
                return "indeterminado";
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
                return "indeterminado";
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

//Funcion para calucular estado de musculo esqueletico
function estadoMusculo(sexo, edad, musculo){

    if ((sexo.toLowerCase()) == "mujer"){
        switch (true){
            case(edad<20 || edad>=80):
                return "indeterminado";
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
                return "indeterminado";
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


//Bucle Interactivo
do{
    nombre=prompt("Ingrese nombre (\"no\" para terminar)");
    if(nombre==="no") break;
    peso=prompt("Ingrese su peso");
    altura=prompt("Ingrese su altura");
    edad=prompt("Ingrese su edad");
    sexo=prompt("Ingrese su sexo (Hombre/Mujer)");


    imc=calcularIMC(peso,altura);
    if(imc<18.5 ){
        console.log(`Hola ${nombre}, tienes un IMC=${imc} y tienes bajo peso`);
        alert(`Hola ${nombre}, tienes un IMC=${imc} y tienes bajo peso`);
    }
    if(imc>=18.5 && imc<25){
        console.log(`Hola ${nombre}, tienes un IMC=${imc} y tienes un peso normal`);
        alert(`Hola ${nombre}, tienes un IMC=${imc} y tienes un peso normal`);
    }
    if(imc>=25 && imc<30){
        console.log(`Hola ${nombre}, tienes un IMC=${imc} y tienes sobrepeso`);
        alert(`Hola ${nombre}, tienes un IMC=${imc} y tienes sobrepeso`);
    }
    if(imc>30){
        console.log(`Hola ${nombre}, tienes un IMC=${imc} y tienes obesidad`);
        alert(`Hola ${nombre}, tienes un IMC=${imc} y tienes obesidad`);
    }

    datosCorporales=prompt("¿Posee informacion del porcentaje grasa corporal y musculo? (Si/No)")
    if(datosCorporales=="si" || datosCorporales=="Si" || datosCorporales=="SI" ){
        grasaCorporal=prompt("Ingrese su porcentaje de grasa corporal");
        musculo=prompt("Ingrese su porcentaje de musculo");
        resultadoGrasa=estadoGrasa(sexo, edad, grasaCorporal);
        resultadoMusculo=estadoMusculo(sexo, edad, musculo);
        console.log(`Tu nivel de grasa es ${resultadoGrasa}`);
        alert(`Tu nivel de grasa es ${resultadoGrasa}`);
        console.log(`Tu nivel de musculo es ${resultadoMusculo}`);
        alert(`Tu nivel de musculo es ${resultadoMusculo}`);
    }


}while(nombre!="no");

