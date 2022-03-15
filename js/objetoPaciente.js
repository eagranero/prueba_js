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
        this.IMC = String((peso/(Math.pow(altura,2))).toFixed(2));
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
}
//------------------------------------------------------------------------------------------
