const form = document.querySelector('form')
const nombre = document.getElementById('nombre');
const apellido1 = document.getElementById('apellido1');
const apellido2 = document.getElementById('apellido2');
const correo = document.getElementById('mail');
const contraseña = document.getElementById('pass');
const confirPass= document.getElementById('confirmPass');
const privacidad = document.getElementById('privacidad');
const errorMensaje = document.querySelectorAll('.error-message');
const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passExp = /[a-zA-Z0-9._%&@€]{8,}/;
const nombreExp=/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

let campo = [
    {campo: nombre, expresion: nombreExp, valor: 0},
    {campo: apellido1, expresion: nombreExp, valor: 2},
    {campo: apellido2, expresion: nombreExp, valor: 4},
    {campo: correo, expresion: regExp, valor: 6},
    {campo: contraseña, expresion: passExp, valor: 8},
];

// Validaciones del nombre
nombre.addEventListener('blur', ()=>{
    validacionExpresiones(nombre, nombreExp, 0);
});

// Validaciones del apellido
apellido1.addEventListener('blur', ()=>{
    validacionExpresiones(apellido1, nombreExp, 2);
});

// Validaciones del correo
correo.addEventListener('blur', ()=>{
    validacionExpresiones(correo, regExp, 6);
});

contraseña.addEventListener('blur', ()=>{
    validacionExpresiones(contraseña, passExp, 8);
});

confirPass.addEventListener('blur', ()=>{
    if(contraseña.value !== confirPass.value){
        confirPass.classList.add('incorrecto');
        errorMensaje[10].style.display = 'block';
    }else{
        confirPass.classList.remove('incorrecto');
        errorMensaje[10].style.display = 'none';

    }
})



document.querySelector('#formulario').addEventListener('submit', function(event) {
    event.preventDefault();

 
    let valido = true;
    if(comprobacionUsuarios(nombre.value)){
        campo.forEach(({campo, expresion, valor}) => {
            // if(valido){
            //     valido = validacionExpresiones(campo, expresion, valor);
            // }
            validacionExpresiones(campo, expresion, valor);

            if(campo.value.trim() === ''){
                campo.classList.add('incorrecto');
                errorMensaje[valor].style.display = 'block';

            }else if(contraseña.value === confirPass.value){
                    
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                // fallo en valido entra siempre cuando entra va a estar un campo true, si esta en true valida y registra corregir campo valido
                if(valido && nombre.value.trim() !== '' && apellido1.value.trim() !== '' && correo.value.trim() !== '' && contraseña.value.trim() !== '' && privacidad.value.trim() !== ''){
                    localStorage.setItem('usuario', JSON.stringify(data));
                    localStorage.setItem('log', data.nombre)
                    // window.location.assign('./index.html');
                }
            } 
            
        });


    }
    manejadorErrores(valido);
    
});

// Funcion para hacer una validacion a todos los elementos y expresiones regulares
function validacionExpresiones(elemento, expresion, numError){
    if(elemento.value.trim() ===''){
        elemento.classList.add('incorrecto');
        errorMensaje[numError].style.display = 'block';
        errorMensaje[numError + 1].style.display = 'none';
        return false;

    }else if((!expresion.test(elemento.value) ) ){
        elemento.classList.add('incorrecto');
        errorMensaje[numError].style.display = 'none';
        errorMensaje[numError + 1].style.display = 'block';
        return false;

    }else if(expresion.test(elemento.value)){
        elemento.classList.remove('incorrecto');
        errorMensaje[numError + 1].style.display = 'none';
        errorMensaje[numError].style.display = 'none';
        return true;

    }
}

function comprobacionUsuarios(user){
    let usuarios = localStorage.getItem('usuario');
    usuarios = JSON.parse(usuarios);

    if(usuarios == null){
        return true;
    }else if(usuarios.nombre == user){
        return false;
    }else{
        return true;
    }
}

function manejadorErrores(valido){
    if(contraseña.value !== confirPass.value){
        alert("Las contraseñas no coinciden");
    }else if(!valido){
        alert('hay algun campo incorrecto');
    }else if(!comprobacionUsuarios(nombre.value)){
        alert('este usuario esta registrado');
    }else{
        alert("Falta algun campo por rellenar");
    }
}