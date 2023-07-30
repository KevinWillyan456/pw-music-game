const trail1 = document.querySelector(".trail-1");
const trail2 = document.querySelector(".trail-2");
const trail3 = document.querySelector(".trail-3");
const trail4 = document.querySelector(".trail-4");

let target1 = document.querySelectorAll(".target-1");
let target2 = document.querySelectorAll(".target-2");
let target3 = document.querySelectorAll(".target-3");
let target4 = document.querySelectorAll(".target-4");

let targets = document.querySelectorAll(".target");

let livePoints = 51;
let totalPoints = 0;
let multiplicatorPoints = 1;
let selectDifficulty = 2;
let canActions = false;
let totalNotes = 0;
let consecutiveHits = 0;

const containerTarget = document.querySelector(".main-container .container");
const livePointer = document.querySelector(
  ".container-info .box .live .pointer-live"
);
const songCover = document.querySelector(".main-container");
const songTitle = document.querySelector(".container-info .box .name");
const contentSongs = document.querySelector(".content-songs");

const song = document.querySelector("#song");

let data;
let songNotes = [];

async function init() {
  const response = await fetch(
    "https://pw-music-game-database.kevinsouza456.repl.co/data.json"
  );
  const responseJson = await response.json();
  data = responseJson;

  function compareSongTitles(a, b) {
    const songTitleA = a.songTitle.toUpperCase();
    const songTitleB = b.songTitle.toUpperCase();

    if (songTitleA < songTitleB) {
      return -1;
    }
    if (songTitleA > songTitleB) {
      return 1;
    }
    return 0;
  }

  data.sort(compareSongTitles);

  const totalTime = 300;
  let currentTime = 2;
  let aux = 1;

  while (currentTime < totalTime) {
    currentTime += 0.25;
    songNotes.push({
      type: `target-${aux}`,
      time: currentTime,
    });

    function gerarNumeroAleatorio() {
      const numeroDecimalAleatorio = Math.random();
      const numeroInteiroAleatorio = Math.floor(numeroDecimalAleatorio * 4);
      const numeroAleatorioDeUmAQuatro = numeroInteiroAleatorio + 1;

      return numeroAleatorioDeUmAQuatro;
    }
    aux = gerarNumeroAleatorio();
  }
  livePointerEvents();
  generatorContentSongs();
}

init();

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
      element1.classList.add("hit");
      element1.addEventListener("animationend", (event) => {
        if (
          event.animationName === "animation-hit-1" ||
          event.animationName === "animation-hit-2" ||
          event.animationName === "animation-hit-3" ||
          event.animationName === "animation-hit-4"
        ) {
          const elemento = event.target;
          elemento.classList.remove("hit");
        }
      });
      livePoints++;
      totalPoints += 50 * multiplicatorPoints;
      totalNotes++;
      livePointerEvents();
      totalPointsEvents();
      totalNotesEvents();
      controllerRateBars();
      consecutiveHits++;
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
    const duration =
      selectDifficulty === 1
        ? 1200
        : selectDifficulty === 2
        ? 1000
        : selectDifficulty === 3
        ? 800
        : 600;

    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const percentage = Math.min(progress / duration, 1);
      const currentPosition = startPosition + percentage * distance;

      element[i].style.top = currentPosition + "px";

      if (element[i].offsetTop >= targetPosition) {
        element[i].remove();
        livePoints =
          selectDifficulty === 1
            ? (livePoints -= 1)
            : selectDifficulty === 2
            ? (livePoints -= 2)
            : (livePoints -= 3);
        livePointerEvents();
        controllerRateBarsMissed();
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
  animateElementDown(targets, window.innerHeight + 140);
}

song.addEventListener("timeupdate", function () {
  const currentTime = song.currentTime;

  songNotes.forEach((moment) => {
    if (currentTime >= moment.time && !moment.created) {
      createElementAtTime(moment.type);
      moment.created = true;
    }
  });
});

function setSong(songChange) {
  song.src = songChange.songUrl;
  song.play();
  songCover.style.setProperty(
    "background-image",
    `url("${songChange.songCover}")`
  );
  songTitle.textContent = songChange.songTitle;
}

const teclasPermitidas = ["d", "f", "j", "k"];
let teclaJaPressionada = {}; // Armazenar o estado de cada tecla

document.addEventListener("keydown", function (event) {
  const teclaPressionada = event.key.toLowerCase();

  // Verifica se a tecla pressionada está na lista de teclas permitidas e se já não foi pressionada antes
  if (
    teclasPermitidas.includes(teclaPressionada) &&
    !teclaJaPressionada[teclaPressionada] &&
    canActions
  ) {
    // Coloque aqui o código que você deseja executar quando uma das teclas for pressionada.
    if (teclaPressionada == "d") {
      trail1.classList.add("pressed");
      if (!isElementOverlapping(trail1, target1)) {
        livePoints =
          selectDifficulty === 1
            ? (livePoints -= 1)
            : selectDifficulty === 2
            ? (livePoints -= 2)
            : (livePoints -= 3);

        livePointerEvents();
        controllerRateBarsMissed();
      }
    }
    if (teclaPressionada == "f") {
      trail2.classList.add("pressed");
      if (!isElementOverlapping(trail2, target2)) {
        livePoints =
          selectDifficulty === 1
            ? (livePoints -= 1)
            : selectDifficulty === 2
            ? (livePoints -= 2)
            : (livePoints -= 3);
        livePointerEvents();
        controllerRateBarsMissed();
      }
    }
    if (teclaPressionada == "j") {
      trail3.classList.add("pressed");
      if (!isElementOverlapping(trail3, target3)) {
        livePoints =
          selectDifficulty === 1
            ? (livePoints -= 1)
            : selectDifficulty === 2
            ? (livePoints -= 2)
            : (livePoints -= 3);
        livePointerEvents();
        controllerRateBarsMissed();
      }
    }
    if (teclaPressionada == "k") {
      trail4.classList.add("pressed");
      if (!isElementOverlapping(trail4, target4)) {
        livePoints =
          selectDifficulty === 1
            ? (livePoints -= 1)
            : selectDifficulty === 2
            ? (livePoints -= 2)
            : (livePoints -= 3);
        livePointerEvents();
        controllerRateBarsMissed();
      }
    }

    teclaJaPressionada[teclaPressionada] = true;
  }
});

document.addEventListener("keyup", function (event) {
  const teclaPressionada = event.key.toLowerCase();

  if (teclaPressionada == "d") {
    trail1.classList.remove("pressed");
  }
  if (teclaPressionada == "f") {
    trail2.classList.remove("pressed");
  }
  if (teclaPressionada == "j") {
    trail3.classList.remove("pressed");
  }
  if (teclaPressionada == "k") {
    trail4.classList.remove("pressed");
  }

  teclaJaPressionada[teclaPressionada] = false;
});

function livePointerEvents() {
  if (livePoints > 100) {
    livePoints = 100;
  }
  livePointer.style.left = livePoints + "%";

  if (livePoints <= 33) {
    document
      .querySelector(".container-info .box .live .live-part-green")
      .classList.remove("hovered");
    document
      .querySelector(".container-info .box .live .live-part-yellow")
      .classList.remove("hovered");
    document
      .querySelector(".container-info .box .live .live-part-red")
      .classList.add("hovered");
  } else if (livePoints >= 66) {
    document
      .querySelector(".container-info .box .live .live-part-red")
      .classList.remove("hovered");
    document
      .querySelector(".container-info .box .live .live-part-yellow")
      .classList.remove("hovered");
    document
      .querySelector(".container-info .box .live .live-part-green")
      .classList.add("hovered");
  } else {
    document
      .querySelector(".container-info .box .live .live-part-red")
      .classList.remove("hovered");
    document
      .querySelector(".container-info .box .live .live-part-green")
      .classList.remove("hovered");
    document
      .querySelector(".container-info .box .live .live-part-yellow")
      .classList.add("hovered");
  }
  if (livePoints <= 20) {
    livePointer.classList.add("almost-failing");
  } else {
    livePointer.classList.remove("almost-failing");
  }
  if (livePoints <= 0) {
    controllerFailed();
  }
}

function totalPointsEvents() {
  document.querySelector(".container-info .box .score").textContent =
    totalPoints;
}
function totalNotesEvents() {
  const formattedTotalNotes = String(totalNotes).padStart(3, "0");
  document.querySelector(".container-info-2 .box .notes-count").textContent =
    formattedTotalNotes;
}

function startCounting(song) {
  document.querySelector(".counter-to-start").style.display = "flex";
  document.querySelector(".container-songs").style.display = "none";
  document.querySelector(".main-container .container").style.display = "flex";
  document.querySelector(".container-info").style.display = "block";
  document.querySelector(".container-info-2").style.display = "block";
  document.querySelector(
    ".main-container .main-container-cover"
  ).style.display = "block";

  setTimeout(() => {
    document.querySelector(".counter-to-start").textContent = 3;
    setTimeout(() => {
      document.querySelector(".counter-to-start").textContent = 2;
      setTimeout(() => {
        document.querySelector(".counter-to-start").textContent = 1;
        setTimeout(() => {
          document.querySelector(".counter-to-start").textContent = "Ready?";
          document.querySelector(".counter-to-start").style.display = "none";
          setSong(song);
          canActions = true;
        }, 800);
      }, 800);
    }, 800);
  }, 1500);
}
function controllerFailed() {
  song.pause();
  canActions = false;
}

document
  .querySelector(".main-container .container-home .logo")
  .addEventListener("click", () => {
    document.querySelector(".main-container .container-home").style.display =
      "none";
    document.querySelector(
      ".main-container .main-container-flashlight"
    ).style.display = "block";

    document
      .querySelector(".main-container .main-container-flashlight")
      .addEventListener("animationend", (event) => {
        if (event.animationName === "animation-main-container-flashlight") {
          document.querySelector(
            ".main-container .main-container-flashlight"
          ).style.display = "none";
        }
      });
    document.querySelector(".container-songs").style.display = "block";
  });

function generatorContentSongs() {
  data.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song");
    songDiv.style.setProperty("background-image", `url("${song.songCover}")`);

    const previewDiv = document.createElement("div");
    previewDiv.classList.add("preview");

    const divisionDiv = document.createElement("div");
    divisionDiv.classList.add("division");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = song.songTitle;

    const contentDifficultyDiv = document.createElement("div");
    contentDifficultyDiv.classList.add("content-difficulty");

    const difficultyEasyDiv = document.createElement("div");
    difficultyEasyDiv.classList.add("difficulty-easy");
    difficultyEasyDiv.textContent = "Easy";
    difficultyEasyDiv.addEventListener("click", () => {
      selectDifficulty = 1;
    });

    const difficultyMediumDiv = document.createElement("div");
    difficultyMediumDiv.classList.add("difficulty-medium");
    difficultyMediumDiv.textContent = "Medium";
    difficultyMediumDiv.addEventListener("click", () => {
      selectDifficulty = 2;
    });

    const difficultyHardDiv = document.createElement("div");
    difficultyHardDiv.classList.add("difficulty-hard");
    difficultyHardDiv.textContent = "Hard";
    difficultyHardDiv.addEventListener("click", () => {
      selectDifficulty = 3;
    });

    const difficultyExpertDiv = document.createElement("div");
    difficultyExpertDiv.classList.add("difficulty-expert");
    difficultyExpertDiv.textContent = "Expert";
    difficultyExpertDiv.addEventListener("click", () => {
      selectDifficulty = 4;
    });

    const songPlayDiv = document.createElement("div");
    songPlayDiv.classList.add("song-play");
    songPlayDiv.textContent = "Play";
    songPlayDiv.addEventListener("click", () => {
      startCounting(song);
    });

    contentDifficultyDiv.appendChild(difficultyEasyDiv);
    contentDifficultyDiv.appendChild(difficultyMediumDiv);
    contentDifficultyDiv.appendChild(difficultyHardDiv);
    contentDifficultyDiv.appendChild(difficultyExpertDiv);

    divisionDiv.appendChild(titleDiv);
    divisionDiv.appendChild(contentDifficultyDiv);

    songDiv.appendChild(previewDiv);
    songDiv.appendChild(divisionDiv);
    songDiv.appendChild(songPlayDiv);

    contentSongs.appendChild(songDiv);
  });
}
function controllerRateBars() {
  const bars = document.querySelectorAll(".bars .bar");

  function divideAndExecute(num) {
    let numString = String(num);
    const number = Number(numString);

    if (number >= 39) {
      numString = String(39);
    }

    const leftPart = numString.length === 1 ? 0 : Number(numString.charAt(0));
    const rightPart =
      numString.length === 1 ? Number(numString) : Number(numString.charAt(1));

    switch (leftPart) {
      case 0:
        functionForZeroLeftPart(rightPart);
        break;
      case 1:
        functionForOneLeftPart(rightPart);
        break;
      case 2:
        functionForTwoLeftPart(rightPart);
        break;
      case 3:
        functionForThreeLeftPart(rightPart);
        break;
    }
  }

  function functionForZeroLeftPart(rightPart) {
    bars[rightPart].classList.add("form-1");
    multiplicatorPoints = 1;
    document.querySelector(
      ".container-info-2 .box .multiplicator-n"
    ).textContent = 1;
  }

  function functionForOneLeftPart(rightPart) {
    bars[rightPart].classList.add("form-2");
    multiplicatorPoints = 2;
    document.querySelector(
      ".container-info-2 .box .multiplicator-n"
    ).textContent = 2;
  }

  function functionForTwoLeftPart(rightPart) {
    bars[rightPart].classList.add("form-3");
    multiplicatorPoints = 4;
    document.querySelector(
      ".container-info-2 .box .multiplicator-n"
    ).textContent = 4;
  }

  function functionForThreeLeftPart(rightPart) {
    bars[rightPart].classList.add("form-4");
    multiplicatorPoints = 8;
    document.querySelector(
      ".container-info-2 .box .multiplicator-n"
    ).textContent = 8;
  }

  divideAndExecute(consecutiveHits);
}
function controllerRateBarsMissed() {
  const bars = document.querySelectorAll(".bars .bar");
  consecutiveHits = 0;
  multiplicatorPoints = 1;
  document.querySelector(
    ".container-info-2 .box .multiplicator-n"
  ).textContent = 1;

  bars.forEach((bar) => {
    bar.classList.remove("form-1", "form-2", "form-3", "form-4");
  });
}
