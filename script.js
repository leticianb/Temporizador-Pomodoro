const html = document.querySelector('html');
const focobt = document.querySelector('.app__card-button--foco');
const curtobt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');
const titulo = document.querySelector('.app__title');

const banner = document.querySelector('.app__image');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const botaoPauseEInicio = document.querySelector('.app__card-primary-butto-icon');
const iniciarouPausarbt = document.querySelector('#start-pause span');
const musica = new Audio('/sons/luna-rise-part-one.mp3'); //readFile()
const tempoNaTela = document.querySelector('#timer');
let tempoDecorridoEmSegundos = 1500;
const startPausebt = document.querySelector('#start-pause');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

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
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focobt.classList.add('active');


})
curtobt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtobt.classList.add('active');

})
longobt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longobt.classList.add('active');


})

function alterarContexto(contexto) {
    mostrarTempo()
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


    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        alert('Tempo finalizado');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
    iniciarouPausarbt.textContent = 'Pausar';
    botaoPauseEInicio.setAttribute('src', '/img/pause.png');



}

startPausebt.addEventListener('click', iniciarouPausar)

function iniciarouPausar() {
    if (intervaloId) {
        audioPausa.play();
        zerar();
        return;

    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);

}

function zerar() {
    clearInterval(intervaloId);
    iniciarouPausarbt.textContent = 'Começar';
    botaoPauseEInicio.setAttribute('src', '/img/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`

}
mostrarTempo()