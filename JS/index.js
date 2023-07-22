const trail1 = document.querySelector(".trail-1");
const trail2 = document.querySelector(".trail-2");
const trail3 = document.querySelector(".trail-3");
const trail4 = document.querySelector(".trail-4");

let target1 = document.querySelectorAll(".target-1");
let target2 = document.querySelectorAll(".target-2");
let target3 = document.querySelectorAll(".target-3");
let target4 = document.querySelectorAll(".target-4");

let targets = document.querySelectorAll(".target");

let livePoints = 100;

const containerTarget = document.querySelector(".main-container .container");
const livePointer = document.querySelector(
  ".container-info .box .live .pointer-live"
);

const song = document.querySelector("#song");

// Dados temporários
const data = [
  {
    songTitle: "Nightcore - abcdefu (rock version)",
    songUrl:
      "https://pw-music-game-database.kevinsouza456.repl.co/Nightcore%20-%20abcdefu%20(rock%20version).mp3",
    notes: [
      {
        type: "target-1",
        time: 2,
      },
      {
        type: "target-2",
        time: 2.2,
      },
      {
        type: "target-3",
        time: 2.4,
      },
      {
        type: "target-4",
        time: 2.6,
      },
      {
        type: "target-2",
        time: 2.8,
      },
    ],
  },
];

const totalTime = 200; // Tempo total em segundos
let currentTime = 2.8; // Inicializando o tempo a partir do último valor
let aux = 1;

while (currentTime < totalTime) {
  currentTime += 0.2; // Incremento de 0.2 segundos
  // Adicionando um novo objeto ao array de targets
  data[0].notes.push({
    type: `target-${aux}`,
    time: currentTime,
  });

  function gerarNumeroAleatorio() {
    // Gera um número decimal aleatório entre 0 (inclusive) e 1 (exclusivo)
    const numeroDecimalAleatorio = Math.random();

    // Multiplica por 4 e arredonda para baixo para obter um número inteiro entre 0 e 3
    const numeroInteiroAleatorio = Math.floor(numeroDecimalAleatorio * 4);

    // Adiciona 1 para obter um número entre 1 e 4
    const numeroAleatorioDeUmAQuatro = numeroInteiroAleatorio + 1;

    return numeroAleatorioDeUmAQuatro;
  }

  // Exemplo de uso
  aux = gerarNumeroAleatorio();
  // if (aux >= 4) {
  //   aux = 1;
  // } else {
  //   aux=3;
  // }
}

function isElementOverlapping(element1, element2) {
  const rect1 = element1.getBoundingClientRect();

  for (let i = 0; i < element2.length; i++) {
    const rect2 = element2[i].getBoundingClientRect();

    // Verificar a sobreposição horizontal
    const horizontalOverlap =
      rect1.left < rect2.right && rect1.right > rect2.left;

    // Verificar a sobreposição vertical
    const verticalOverlap =
      rect1.top < rect2.bottom && rect1.bottom > rect2.top;

    // Retorna true se houver sobreposição tanto na horizontal quanto na vertical
    if (horizontalOverlap && verticalOverlap) {
      element2[i].remove();
      livePoints++;
      livePointerEvents();
      return true;
    }
  }

  // Se não houver sobreposição com nenhum dos elementos em element2, retornamos false
  return false;
}

function animateElementDown(element, distance) {
  for (let i = 0; i < element.length; i++) {
    const startPosition = element[i].offsetTop;
    const targetPosition = startPosition + distance;
    const duration = 1000; // Duração da animação em milissegundos (1 segundo no exemplo)

    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const percentage = Math.min(progress / duration, 1);
      const currentPosition = startPosition + percentage * distance;

      element[i].style.top = currentPosition + "px";

      if (element[i].offsetTop >= targetPosition) {
        element[i].remove();
        livePoints--;
        livePointerEvents();
      }

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }
}

function createElementAtTime(type) {
  const element = document.createElement("div");
  element.classList = `target ${type}`;
  containerTarget.appendChild(element);

  targets = document.querySelectorAll(".target");
  target1 = document.querySelectorAll(".target-1");
  target2 = document.querySelectorAll(".target-2");
  target3 = document.querySelectorAll(".target-3");
  target4 = document.querySelectorAll(".target-4");
  animateElementDown(targets, window.innerHeight + 70);
}

song.addEventListener("timeupdate", function () {
  const currentTime = song.currentTime;

  data[0].notes.forEach((moment) => {
    if (currentTime >= moment.time && !moment.created) {
      createElementAtTime(moment.type);
      moment.created = true;
    }
  });
});

function setSong() {
  song.src = data[0].songUrl;
  song.play();
}

const teclasPermitidas = ["d", "f", "j", "k", "enter"];
let teclaJaPressionada = {}; // Armazenar o estado de cada tecla

document.addEventListener("keydown", function (event) {
  const teclaPressionada = event.key.toLowerCase();

  // Verifica se a tecla pressionada está na lista de teclas permitidas e se já não foi pressionada antes
  if (
    teclasPermitidas.includes(teclaPressionada) &&
    !teclaJaPressionada[teclaPressionada]
  ) {
    // Coloque aqui o código que você deseja executar quando uma das teclas for pressionada.
    if (teclaPressionada == "d") {
      if (isElementOverlapping(trail1, target1)) {
        // alert("acertou");
      } else {
        // console.log("Errou");
        livePoints--;
        livePointerEvents();
      }
    }
    if (teclaPressionada == "f") {
      if (isElementOverlapping(trail2, target2)) {
        // alert("acertou");
      } else {
        // console.log("Errou");
        livePoints--;
        livePointerEvents();
      }
    }
    if (teclaPressionada == "j") {
      if (isElementOverlapping(trail3, target3)) {
        // alert("acertou");
      } else {
        // console.log("Errou");
        livePoints--;
        livePointerEvents();
      }
    }
    if (teclaPressionada == "k") {
      if (isElementOverlapping(trail4, target4)) {
        // alert("acertou");
      } else {
        // console.log("Errou");
        livePoints--;
        livePointerEvents();
      }
    }
    if (teclaPressionada == "enter") {
      setSong();
    }

    teclaJaPressionada[teclaPressionada] = true; // Define a tecla como pressionada para evitar repetições
  }
});

document.addEventListener("keyup", function (event) {
  const teclaPressionada = event.key.toLowerCase();

  // Quando a tecla é liberada, a marcação é removida, permitindo que ela seja pressionada novamente no futuro
  teclaJaPressionada[teclaPressionada] = false;
});

function livePointerEvents() {
  if (livePoints > 100) {
    livePoints = 100;
  }
  livePointer.style.left = livePoints + "%";
}
