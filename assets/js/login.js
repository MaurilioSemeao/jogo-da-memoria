'use strict';
(()=>{
    const $input = document.querySelector('.input-name');
    const $button = document.querySelector('.button-name');

    function validarInput({target}){
        if(target.value.length > 3){
            $button.removeAttribute('disabled');
            return;
        }
        $button.setAttribute('disabled','');
    }

    $input.addEventListener('input',validarInput)

})()