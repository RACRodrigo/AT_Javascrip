function start(){
    /** Inicio Render HTML */
    const cardBoard = document.querySelector("#tabuleiro");
    const imagens = [
    "android.png",
    "chrome.png",
    "facebook.png",
    "firefox.png",
    "googleplus.png",
    "html5.png",
    "twitter.png",
    "windows.png"
    ];

    let cartaHTML = "";

    imagens.forEach(imagem => {
    cartaHTML += `<div class="carta-memoria" data-card="${imagem}">
        <img class="frente" src="Imagens/${imagem}"/>
        <img class="verso" src="Imagens/cross.png">
    </div>`;
    });

    cardBoard.innerHTML = cartaHTML + cartaHTML;

    /** Fim Render HTML */

    const cartas = document.querySelectorAll(".carta-memoria");
    let cartaA, cartaB;
    let travaCarta = false;
    /** Seleciona cartas */
    function viracarta() {
        if (travaCarta) return false;
        this.classList.add("vira");

        if (!cartaA) {
            cartaA = this;
            return false;
    }
    cartaB = this;
    testeCombina();
    }

    /** Compar carta A e B */
    function testeCombina() {
        let combina = cartaA.dataset.card === cartaB.dataset.card;

        !combina ? desviraCarta() : resetCartas(combina);
    }

    /** Desvira carta em caso não combinar */
    function desviraCarta() {
    travaCarta = true;
        setTimeout(() => {
            cartaA.classList.remove("vira");
            cartaB.classList.remove("vira");

            resetCartas();
        }, 1500);
    }

    /**Inicio reset trava das cartas para comparação */
    function resetCartas(combina = false) {
        if (combina) {
            cartaA.removeEventListener("click", viracarta);
            cartaB.removeEventListener("click", viracarta);
        }

    [cartaA, cartaB, travaCarta] = [null, null, false];
    }

    /**Função embaralha cartas */
    (function embaralhaCartas(){
        cartas.forEach( card =>{
        var randomizer = Math.floor(Math.random() * 16);
        card.style.order = randomizer;
        })
    })();
    
    cartas.forEach(card => card.addEventListener("click", viracarta));
}
