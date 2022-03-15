
let listaErroresCarga=[]; let auxASCII;

class erroresCarga{
    constructor (espacio,error){
        this.espacio=espacio;
        this.error=error
    }
}

//Funcion para limpiar listado de errores y normalizar el color de los elementos del form-----
function limpiarErrores(){
    nombre.style.borderColor="grey";
    apellido.style.borderColor="grey";
    edad.style.borderColor="grey";
    sexo.style.borderColor="grey";
    altura.style.borderColor="grey";
    peso.style.borderColor="grey";
    grasaCorporal.style.borderColor="grey";
    musculo.style.borderColor="grey";
    listaErroresCarga=[];
}
//----------------------------------------------------------------------------------------------

//Funcion para validar los elementos cargados en form--------------------------------------------
function validarDatos(nombre,apellido,edad,peso,altura,sexo,grasaCorporal,musculo){
    limpiarErrores();
    
    //Validacion del Nombre
    if (nombre=="") listaErroresCarga.push(new erroresCarga("nombre","Nombre no asignado"));
    
    //Validacion del Apellido
    if (apellido=="") listaErroresCarga.push(new erroresCarga("apellido","Apellido no asignado"));
    
    //Validacion de la edad
    if (edad=="") listaErroresCarga.push(new erroresCarga("edad","Edad no asignada"));
    for(i=0;i<edad.length;i++){
        auxASCII=edad[i];
        if ((auxASCII.charCodeAt(0)>57 || auxASCII.charCodeAt(0)<47)){listaErroresCarga.push(new erroresCarga("edad","Edad: Usar solo caracteres numericos"));break;}
    }
    
    //Validacion del Peso
    if (peso=="") listaErroresCarga.push(new erroresCarga("peso","Peso no asignado"));
    for(i=0;i<peso.length;i++){
        auxASCII=peso[i];
        if (peso[i]==','){ listaErroresCarga.push(new erroresCarga("peso","Peso: Usar caracter \".\" para numeros decimales"));break;}
        else if ((auxASCII.charCodeAt(0)>57 || auxASCII.charCodeAt(0)<47) && peso[i]!='.' ){listaErroresCarga.push(new erroresCarga("peso","Peso: Usar solo caracteres numericos"));break;}
    }
    
    //Validacion de la Altura
    if (altura=="") listaErroresCarga.push(new erroresCarga("altura","Altura no asignada"));
    for(i=0;i<altura.length;i++){
        auxASCII=altura[i];
        if (auxASCII==','){listaErroresCarga.push(new erroresCarga("altura","Altura: Usar caracter \".\" para numeros decimales"));break;}
        else if ((auxASCII.charCodeAt(0)>57 || auxASCII.charCodeAt(0)<47) && auxASCII!='.' ){listaErroresCarga.push(new erroresCarga("altura","Altura: Usar solo caracteres numericos"));break;}
    }
    
    //Validacion del Sexo
    if (sexo=="") listaErroresCarga.push(new erroresCarga("sexo","Sexo no asignado"));
    else if (sexo!="hombre" && sexo!="mujer" ) listaErroresCarga.push(new erroresCarga("sexo","En Sexo solo se admite \"Hombre\" o \"Mujer\""));
    
    //Validacion de la Grasa Corporal
    for(i=0;i<grasaCorporal.length;i++){
        auxASCII=grasaCorporal[i];
        if (auxASCII==','){listaErroresCarga.push(new erroresCarga("grasaCorporal","Grasa Corporal: Usar caracter \".\" para numeros decimales"));break;}
        else if ((auxASCII.charCodeAt(0)>57 || auxASCII.charCodeAt(0)<47) && auxASCII!='.' ) {listaErroresCarga.push(new erroresCarga("grasaCorporal","Grasa Corporal: Usar solo caracteres numericos"));break;}
            
    }
    
    //Validacion del Musculo Esqueletico
    for(i=0;i<musculo.length;i++){
        auxASCII=musculo[i];
        if (auxASCII==','){ listaErroresCarga.push(new erroresCarga("musculo","Musculo Esqueletico: Usar caracter \".\" para numeros decimales"));break;}
        else if ((auxASCII.charCodeAt(0)>57 || auxASCII.charCodeAt(0)<47) && auxASCII!='.' ) {listaErroresCarga.push(new erroresCarga("musculo","Musculo Esqueletico: Usar solo caracteres numericos"));break;}
    }
    

    //Retorno respuesta de la validacion
    if (listaErroresCarga.length>0) return 1;
    else return 0;
}
//-----------------------------------------------------------------------------------------------------


//Funcion para mostrar los errores en pantalla del form------------------------------------------------
function mostrarErrores(){
    listaErroresCarga.forEach((elemento)=>{
        Toastify({
            text: elemento.error,
            duration: 3000,
            gravity: "top",
            style: {
            background: "color(to right, #00b09b, #96c93d)",
        },
        }).showToast();

        switch (true){
            case (elemento.espacio=="nombre"):
                nombre.style.borderColor="red";
                break;
            case (elemento.espacio=="apellido"):
                apellido.style.borderColor="red";
                break;
            case (elemento.espacio=="edad"):
                edad.style.borderColor="red";
                break;
            case (elemento.espacio=="sexo"):
                sexo.style.borderColor="red";
                break;
            case (elemento.espacio=="altura"):
                altura.style.borderColor="red";
                break;
            case (elemento.espacio=="peso"):
                peso.style.borderColor="red";
                break;
            case (elemento.espacio=="grasaCorporal"):
                grasaCorporal.style.borderColor="red";
                break;
            case (elemento.espacio=="musculo"):
                musculo.style.borderColor="red";
                break;
        }

    })
}
//---------------------------------------------------------------------------------------------------
