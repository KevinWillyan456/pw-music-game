const trail1 = document.querySelector(".trail-1");
const trail2 = document.querySelector(".trail-2");
const trail3 = document.querySelector(".trail-3");
const trail4 = document.querySelector(".trail-4");

let target1 = document.querySelectorAll(".target-1");
let target2 = document.querySelectorAll(".target-2");
let target3 = document.querySelectorAll(".target-3");
let target4 = document.querySelectorAll(".target-4");

const containerTarget = document.querySelector(".main-container .container");

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
      return true;
    }
  }

  // Se não houver sobreposição com nenhum dos elementos em element2, retornamos false
  return false;
}

setInterval(() => {
  const ele = document.createElement('div')
  ele.classList = "target target-4"
  containerTarget.appendChild(ele);
  elementosAnimados = document.querySelectorAll(".target");
  target1 = document.querySelectorAll(".target-1");
  target2 = document.querySelectorAll(".target-2");
  target3 = document.querySelectorAll(".target-3");
  target4 = document.querySelectorAll(".target-4");
  animateElementDown(elementosAnimados, window.innerHeight);
}, 500);

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
      }

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }
}

// Exemplo de uso:
let elementosAnimados = document.querySelectorAll(".target");
animateElementDown(elementosAnimados, window.innerHeight); // Desce 200 pixels

// seu_script.js
const teclasPermitidas = ["d", "f", "j", "k"];
let teclaJaPressionada = {}; // Armazenar o estado de cada tecla

document.addEventListener("keydown", function (event) {
  const teclaPressionada = event.key.toLowerCase();

  // Verifica se a tecla pressionada está na lista de teclas permitidas e se já não foi pressionada antes
  if (
    teclasPermitidas.includes(teclaPressionada) &&
    !teclaJaPressionada[teclaPressionada]
  ) {
    console.log("Tecla pressionada: " + teclaPressionada);

    // Coloque aqui o código que você deseja executar quando uma das teclas for pressionada.
    if (teclaPressionada == "d") {
      if (isElementOverlapping(trail1, target1)) {
        alert("acertou");
      } else {
        console.log("Errou");
      }
    }
    if (teclaPressionada == "f") {
      if (isElementOverlapping(trail2, target2)) {
        alert("acertou");
      } else {
        console.log("Errou");
      }
    }
    if (teclaPressionada == "j") {
      if (isElementOverlapping(trail3, target3)) {
        alert("acertou");
      } else {
        console.log("Errou");
      }
    }
    if (teclaPressionada == "k") {
      if (isElementOverlapping(trail4, target4)) {
        alert("acertou");
      } else {
        console.log("Errou");
      }
    }

    teclaJaPressionada[teclaPressionada] = true; // Define a tecla como pressionada para evitar repetições
  }
});

document.addEventListener("keyup", function (event) {
  const teclaPressionada = event.key.toLowerCase();

  // Quando a tecla é liberada, a marcação é removida, permitindo que ela seja pressionada novamente no futuro
  teclaJaPressionada[teclaPressionada] = false;
});
