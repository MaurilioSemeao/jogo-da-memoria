const carta = document.querySelectorAll(".card");

    carta.forEach(item =>{
        flip(item);
    });

function flip(item){
    item.addEventListener("click",()=>{
        item.classList.toggle("flip");
    });
}


