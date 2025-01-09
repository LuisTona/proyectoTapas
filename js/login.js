// js del login queda revisarlo por si se puede mejorar o implementar alguna funcionalidad a mayores
const form = document.querySelector('form');
let user = document.getElementById('user').value;
let pass = document.getElementById('contraseña').value;

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    // let datos = JSON.parse(localStorage.usuario);
    // console.log(datos);

    function guardarToken(token){
        localStorage.setItem('token', token);
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    let option = {
        method: 'post',
        mode: 'cors',
        headers:{
            'Content-type': 'Application/json',
        },
        body: JSON.stringify(data),
    };

    fetch('http://localhost/php/www/proyectoTapas/php/login.php', option)
    .then(res =>{
        if(res.status === 200){
            return res.json()
        }else{
            alert("Nombre o Contraseña Incorrectos");
        }
        
    })

    .then(data =>{
        console.log(data);
        window.location.href = 'index.html';
        guardarToken(data.jwt);
        localStorage.setItem('log', data.nombre);
        localStorage.setItem('rol', data.rol);
            

    })
})