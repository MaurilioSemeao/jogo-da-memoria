'use strict';
(()=>{
    const $input = document.querySelector('.input-name');
    const $button = document.querySelector('.button-login');
    const $forms = document.forms[0];

    function validarInput({target}){
        if(target.value.length > 3){
            $button.removeAttribute('disabled');
            return;
        }
        $button.setAttribute('disabled','');
    }

    $input.addEventListener('input',validarInput)

    $forms.addEventListener('submit',(event)=>{
        event.preventDefault();

        window.location = "./paginas/jogo.html";
        window.localStorage.setItem('nome',$input.value);
        window.sessionStorage.setItem('nome',$input.value);
    });

})()