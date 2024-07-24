const html = document.querySelector('html');
const focobt = document.querySelector('.app__card-button--foco');
const curtobt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');
const titulo = document.querySelector('.app__title');

const banner = document.querySelector('.app__image');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3'); //readFile()
let tempoDecorridoEmSegundos = 5;
const startPausebt = document.querySelector('#start-pause');
let intervaloId = null;

musica.loop = true;
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focobt.addEventListener("click", () => {
    alterarContexto('foco');
    focobt.classList.add('active');
})
curtobt.addEventListener("click", () => {
    alterarContexto('descanso-curto');
    curtobt.classList.add('active');
})
longobt.addEventListener("click", () => {
    alterarContexto('descanso-longo');
    longobt.classList.add('active');

})

function alterarContexto(contexto) {
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/img/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = ` Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = ` Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = ` Hora de voltar à superfície<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    iniciar()
    tempoDecorridoEmSegundos -= 1;
}

startPausebt.addEventListener('click', contagemRegressiva)

function iniciar() {
    intervaloId = setInterval(contagemRegressiva, 1000)
}