'unse strict';
(()=>{

    const nomePersonagens=[
        "dragao-alado-de-ra",
        "dragao-caveira-negro",
        "dragao-milenar",
        "dragrao-branco-de-olhos-azuis",
        "dragrao-negro-dos-olhos-vermelhos",
        "exodia",
        "gerreiro-da-espada-flamejante-",
        "kuriboh",
        "mago-do-tempo",
        "mago-negro",
        "obelisco-o-atormentador",
        "slifer-o-dragao-celeste",
        "spellcaster",
        "troca-de-coração",
        "yami-yugi",
    ]

    let primeiraCarta = undefined;
    let segundaCarta = undefined;
    let endGame = false;
    let contClick = 0;
    let pontuacao = 0;
    let contador = 0;

    function Cards(tag, nomeClass){
        const card = document.createElement(tag);
        card.className = nomeClass; 
        return card;
    }
    
    function newCard(item, callback){
        const grid = document.querySelector(".container-grid");
        const card =  Cards('div', 'card');
        const faceFront = Cards('div', 'face front' )
        const faceBack = Cards('div', 'face back')

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
            exibePontuacao(pontuacao);
    }

    function verificaFimDeJogo(tamArray){
        const cardDesabilitada = document.querySelectorAll(".desabilitar");
        const telaEnd = document.querySelector('.end-game');
        if(tamArray === cardDesabilitada.length){
            endGame = true;
            setTimeout(()=>{
                telaEnd.classList.add('visibilit')
                const grid = document.querySelector(".container-grid");
                grid.innerHTML ="";
            },500)
           
        }
       
    }

    function exibeNome(){
        const nome = document.getElementById('nome');
        if(localStorage.getItem('nome')){
            nome.innerText = localStorage.getItem('nome')
        }
    }

    function contTimer(){
        const timer = document.getElementById('timer');
        timer.innerHTML  = contador.toString();
        contador++;
        if(endGame){
            clearInterval(contSetTimer);
        }     
    }
    const contSetTimer = setInterval(contTimer,1000);
    

   function exibePontuacao(pontuacao){
        const pontos = document.getElementById('pontos');
        pontos.innerHTML = pontuacao.toString();
   }

    function iniciaJogo(){
        const personaDuplicado = [...nomePersonagens, ...nomePersonagens];
        personaDuplicado.sort(()=> Math.random() - 0.5);
        const tamanhoArray = personaDuplicado.length;
    
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
