//Variables

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para campos

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ; // validacion por regex 


eventListener();
function eventListener() {
    //cuando la app arrance
    document.addEventListener('DOMContentLoaded', iniciarapp);

    //campos del form

    email.addEventListener('blur', validarformulario);
    asunto.addEventListener('blur', validarformulario);
    mensaje.addEventListener('blur', validarformulario);

    // Reinicia el formulario
    
    btnReset.addEventListener('click', resetearFormulario);

    //Enviar email 
    formulario.addEventListener('submit',Enviaremail);

}

//Funciones

function iniciarapp(){

    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//Valida el form

function validarformulario(e){


    if(e.target.value.length >0){

        //elimina los errores (DOM)
        const error = document.querySelector('p.error');
        if(error){
            error.remove();

        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }
    else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){
        
        if (er.test(e.target.value)){
        
        const error = document.querySelector('p.error');
        if(error){
            error.remove();

        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        }
        else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }

    if (er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }

}

function mostrarError(mensaje){

    const mensajeError = document.createElement ('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add ('border','border-red-500','background-red-100', 'text-red-500','p-3', 'mt-6', 'text-center','error');

    const errores = document.querySelectorAll('.error'); // esto va a verificar si ya existe un clase con mensaje error, lo va a cargar y dejar de ejecutar si hay mas de 1. 
    //Se uso el QuerySelectorAll >> ya que se quiere verificar un conjunto de valores (por eso se puede acceder a.length)
    if(errores.length === 0){

        formulario.appendChild(mensajeError);
        //si se quiere mostrar el mensaje arriba se use el insertbefore >> formulario.insertBefore(mensajeError, document.querySelector('.mb-10'))

    }

}
//mostrarError va a indicar al usuario que hay un error 
//e.target es el input sobre el cual se escribe

// Enviar Email Funcion 
function Enviaremail(e){
    e.preventDefault();

    //Mostrar el Spinner

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    // Despues de 3 segundos ocultar el spinner y mostrar el mensaje

    setTimeout(() => {
        spinner.style.display = 'none';

        //Mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10','p-2', 'bg-green-500','text-white','font-bold', 'uppercase')
    
        // Inserta el parrafo antes del spinner
        formulario.insertBefore (parrafo, spinner);

        setTimeout(() => {

            parrafo.remove(); // Eliminar el mensaje de exito

            resetearFormulario();
        }, 5000);

    }, 3000);
}

// Funcion que resetea el formulario
function resetearFormulario() {

    formulario.reset();
    iniciarapp();
}



