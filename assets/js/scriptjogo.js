'unse strict';
(()=>{
    function criaCard(){
        const grid = document.querySelector(".container-grid");
        const card = document.createElement("div");
        const faceFront = document.createElement("div");
        const faceBack = document.createElement("div");

        card.classList.add("card");
        faceFront.classList.add("face","front");
        faceBack.classList.add("face","back");
        
        card.appendChild(faceFront);
        card.appendChild(faceBack);
        
        grid.appendChild(card)

    }
    criaCard();
})();
