'unse strict';
(()=>{

    const nomePersonagens=[
        "dragao-alado-de-ra",
        "dragao-caveira-negro",
        "dragao-milenar",
        // "dragrao-branco-de-olhos-azuis",
        // "dragrao-negro-dos-olhos-vermelhos",
        // "exodia",
        // "gerreiro-da-espada-flamejante-",
        // "kuriboh",
        // "mago-do-tempo",
        // "mago-negro",
        // "obelisco-o-atormentador",
        // "slifer-o-dragao-celeste",
        // "spellcaster",
        // "troca-de-coração",
        // "yami-yugi",
    ]

    let primeiraCarta = undefined;
    let segundaCarta = undefined;
    let contClick = 0;
    //propriedade tela
    const timer = document.getElementById('timer');
    const pontos = document.getElementById('pontos');
    const nomeJogador = localStorage.getItem('nome');
    //variaveis de controle   
    let contador = 0;
    let pontuacao = 0;
    let endGame = false;

    function Elemento(tag, nomeClass){
        const elemento = document.createElement(tag);
        elemento.className = nomeClass; 
        return elemento;
    }
    
    function newCard(item, callback){
        const grid = document.querySelector(".container-grid");
        const card =  Elemento('div', 'card');
        const faceFront = Elemento('div', 'face front' )
        const faceBack = Elemento('div', 'face back')

        card.setAttribute("data-personagen",item)
        faceFront.style.backgroundImage = `url("../assets/img/${item}.png")`;
       
        card.appendChild(faceFront);
        card.appendChild(faceBack);

        callback(card)

        grid.appendChild(card)
    }

    function flip(item){
        
       if(item.target.parentNode.className === "container-grid" ||item.target.parentNode.className.includes("flip") || contClick === 2){
            return;
        }
       
        item.target.parentNode.classList.add("flip");
        const nomePersonagen = item.target.parentNode
        verificaJogo(nomePersonagen);
    }

    function resetVerificador(){
        primeiraCarta = undefined;
        segundaCarta = undefined;
        contClick = 0;
    }

    function resetSeErrou(card_1, card_2){
        setTimeout(()=>{
            card_1.classList.remove("flip");
            card_2.classList.remove("flip");
            resetVerificador()
            clearTimeout();
        },600)
    }

    function resetSeAcerto(card_1, card_2){
        card_1.firstChild.classList.add("desabilitar");
        card_2.firstChild.classList.add("desabilitar");
        resetVerificador();
        
    }

    function verificaJogo(personagen){
        if(primeiraCarta === undefined){
            primeiraCarta = personagen;
            contClick++;
        }else{
            segundaCarta = personagen;
            contClick++;
        }

        if(contClick !== 2){     
            return;
        } 
        
        if(primeiraCarta.dataset.personagen === segundaCarta.dataset.personagen){
            pontuacao += 100;
           resetSeAcerto(primeiraCarta,segundaCarta)
        }else{
             if(pontuacao != 0){
                pontuacao -= 10;
             }   
            resetSeErrou(primeiraCarta,segundaCarta)
        }
            exibePontuacao();
    }

    function verificaFimDeJogo(tamArray){
        const cardDesabilitada = document.querySelectorAll(".desabilitar"); 
          
        if(tamArray === cardDesabilitada.length){
            endGame = true;
            salvarDadosJogo(nomeJogador,contador,pontuacao);
            setTimeout(()=>{
                chamaFimDeJogo();
                const grid = document.querySelector(".container-grid");
                grid.innerHTML ="";
            },1000)
           
        }

        
       
    }

    function exibeNome(){
        const nome = document.getElementById('nome');
        if(localStorage.getItem('nome')){
            nome.innerText = nomeJogador
        }
    }

    function exibePontuacao(){
        pontos.innerHTML = pontuacao.toString();
   }

   function resetGame(tela,btn){
            const telaInfo = document.querySelector('.info');
            tela.classList.remove('visibilit')
            timer.innerHTML  = '0';
            pontos.innerHTML = '0';
            telaInfo.innerHTML = " ";
            pontuacao = 0;
            contador = 0;
            endGame = false
            setTimeout(iniciaJogo,500)
            btn.removeEventListener('click',resetGame);
   }

   function newInfo(obPlayer){
        const telaInfo = document.querySelector('.info');
        const div = Elemento('div','player item');
        const sName = Elemento('span','nome-inf');
        const sTimer = Elemento('span','timer-info');
        const sPontos = Elemento('span','pontos-info');

        const txtNome = document.createTextNode(obPlayer.nome);
        const txtTimer = document.createTextNode(obPlayer.timer);
        const txtPontos = document.createTextNode(obPlayer.pontos);
        
        sName.appendChild(txtNome);
        sTimer.appendChild(txtTimer);
        sPontos.appendChild(txtPontos);

        div.appendChild(sName)
        div.appendChild(sTimer)
        div.appendChild(sPontos)

        telaInfo.appendChild(div)
    }    
    
    function chamaFimDeJogo(){
        const telaEnd = document.querySelector('.end-game');
        const $novoJogo = document.querySelector("#novo-jogo");
        const $voltarInicio = document.querySelector('#voltar-inicio')

        const arryRetorno = JSON.parse(localStorage.getItem('partidasjogadas'));

        arryRetorno.forEach(newInfo)
    
        telaEnd.classList.add('visibilit');

        $novoJogo.addEventListener('click',()=>{
            resetGame(telaEnd,$novoJogo)
            
           
        });
        
        $voltarInicio.addEventListener('click',()=>{
            window.location = "../index.html"
        });
    }

   function salvarDadosJogo(nome,timer,toalPontos){

        let arrayUltimaJogadas = [];

        if(localStorage.getItem('partidasjogadas')){
            const arryRetorno = JSON.parse(localStorage.getItem('partidasjogadas'));
            arrayUltimaJogadas = [...arryRetorno];
        }

        toalPontos = toalPontos - timer

        const player ={
            nome:nome,
            timer:timer,
            pontos:toalPontos
        };

        arrayUltimaJogadas.unshift(player);

        window.localStorage.setItem('partidasjogadas', JSON.stringify(arrayUltimaJogadas));
   }
   
   function iniciaJogo(){
       
        const personaDuplicado = [...nomePersonagens, ...nomePersonagens];
        personaDuplicado.sort(()=> Math.random() - 0.5);
        const tamanhoArray = personaDuplicado.length;

        function contTimer(){
            timer.innerHTML  = contador.toString();
            contador++;
            if(endGame){
                clearInterval(contSetTimer);
            }     
        }
        const contSetTimer = setInterval(contTimer,1000);

        exibeNome();
        personaDuplicado.forEach((item)=>{
            newCard(item,(card)=>{
                card.addEventListener("click",(item)=> {
                    flip(item)
                    verificaFimDeJogo(tamanhoArray);
                    
                });
                setTimeout(()=>{
                    card.classList.add("flip");
                    setTimeout(()=>{
                        card.classList.remove("flip");
                        clearTimeout();
                    },3000);
                    clearTimeout();
                },500);
            });
            
        })
        
    }
    iniciaJogo();

})();
