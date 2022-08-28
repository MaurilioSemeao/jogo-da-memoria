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
        // "obelisco-o-atormentador",
        // "slifer-o-dragao-celeste",
        // "spellcaster",
        // "troca-de-coração",
        // "yami-yugi",
    ]
  
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
       if(item.target.parentNode.className === "container-grid" ||item.target.parentNode.className.includes("flip")){
            return
        }
       
        item.target.parentNode.classList.add("flip")
        console.log("click")
    }
    
    function iniciaJogo(){
        const personaDuplicado = [...nomePersonagens, ...nomePersonagens];
        personaDuplicado.sort(()=> 0.10 - Math.random());

        personaDuplicado.forEach((item)=>{
            newCard(item,(card)=>{
                card.addEventListener("click",item=> flip(item));
            });
            
        })
    }
    iniciaJogo();

})();
