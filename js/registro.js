let formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (event)=>{
    event.preventDefault();
    const nombre = document.getElementById('nombre');
    const apellido1 = document.getElementById('apellido1');
    const apellido2 = document.getElementById('apellido2');
    const correo = document.getElementById('mail');
    const contraseña = document.getElementById('pass');
    const confirPass= document.getElementById('confirmPass');
    const privacidad = document.getElementById('privacidad');

    const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // let usuario_nuevo = {
    //     'nombre': nombre.value.trim(),
    //     'apellido1':apellido1.value.trim(),
    //     'apellido2': apellido2.value.trim(),
    //     'correo': correo.value.trim(),
    //     'contraseña': contraseña.value.trim(),
    //     'confirmPass': confirPass.value.trim(),
    //     'privacidad': privacidad.value.trim(),
    // }

    if(regExp.test(correo.value.trim())){
        // window.location.href = '../login.html';
    }

    const formData = new FormData(formulario);
    const data = Object.fromEntries(formData);
    
    if(data.privacidad== 'on'){
        data.privacidad = true;
    }else{
        data.privacidad = false;
    }

    let options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }

    fetch("http://localhost/php/www/proyectoTapas/php/registro.php", options)
    .then(res=>{
        if(res === 201){
            
            return res.json();
        }
    })
    .then(data=>{
        console.log(data.);
    })

})