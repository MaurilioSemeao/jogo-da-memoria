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
        setTimeout(()=>{
            window.location = "./paginas/jogo.html";
        },2000)
        window.sessionStorage.setItem('nome',$input.value);
        audioLogin();
    });

    function audioLogin(){
        const music = new Audio();
        music.src = "./assets/audio/login.m4a";
        music.volume = 0.3;
        music.play();
    }

    window.addEventListener('load',audioLogin);

})()