function isElementOverlapping(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  // Verificar a sobreposição horizontal
  const horizontalOverlap =
    rect1.left < rect2.right && rect1.right > rect2.left;

  // Verificar a sobreposição vertical
  const verticalOverlap = rect1.top < rect2.bottom && rect1.bottom > rect2.top;

  // Retorna true se houver sobreposição tanto na horizontal quanto na vertical
  return horizontalOverlap && verticalOverlap;
}

const elemento1 = document.querySelector(".trail-1"); // Substitua 'elemento1' pelo ID do primeiro elemento
const elemento2 = document.querySelector(".target-1"); // Substitua 'elemento2' pelo ID do segundo elemento

// setInterval(() => {
//   if (isElementOverlapping(elemento1, elemento2)) {
//     console.log("Os elementos estão sobrepostos!");
//   } else {
//     console.log("Os elementos não estão sobrepostos.");
//   }
// }, 200);

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

      if (element[i].offsetTop == targetPosition) {
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
const elementosAnimados = document.querySelectorAll(".target");
animateElementDown(elementosAnimados, window.innerHeight); // Desce 200 pixels
