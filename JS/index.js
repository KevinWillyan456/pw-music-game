const trail1 = document.querySelector('.trail-1')
const trail2 = document.querySelector('.trail-2')
const trail3 = document.querySelector('.trail-3')
const trail4 = document.querySelector('.trail-4')

let target1 = document.querySelectorAll('.target-1')
let target2 = document.querySelectorAll('.target-2')
let target3 = document.querySelectorAll('.target-3')
let target4 = document.querySelectorAll('.target-4')

let targets = document.querySelectorAll('.target')

let livePoints = 51
let totalPoints = 0
let multiplicatorPoints = 1
let selectDifficulty = 2
let canActions = false
let canPause = false
let totalNotes = 0
let consecutiveHits = 0

let gamePausedDelay = null
let gamePaused = false

const containerTarget = document.querySelector('.main-container .container')
const livePointer = document.querySelector(
    '.content-info .box .live .pointer-live'
)
const songCover = document.querySelector('.container-game')
const songTitle = document.querySelector('.content-info .box .name')
const contentSongs = document.querySelector('.content-songs')

const song = document.querySelector('#song')
const songPreviw = document.querySelector('#song-preview')

let data = [
    {
        songTitle: 'Akemi Homura AMV - Animal I Have Become',
        songUrl:
            'https://pw-music-game-db.netlify.app/resources/akemi%20homura%20amv%20-%20animal%20i%20have%20become.mp3',
        songCover: 'https://img.youtube.com/vi/JYdAfeVR7Ck/sddefault.jpg',
    },
    {
        songTitle: 'g3ox_em - GigaChad Theme (Phonk House Version)',
        songUrl:
            'https://pw-music-game-db.netlify.app/resources/g3ox_em%20-%20gigachad%20theme%20(phonk%20house%20version).mp3',
        songCover: 'https://img.youtube.com/vi/OVh0bMNSFss/sddefault.jpg',
    },
    {
        songTitle: 'Nightcore - abcdefu (rock version // lyrics)',
        songUrl:
            'https://pw-music-game-db.netlify.app/resources/nightcore%20-%20abcdefu%20(rock%20version)%20(lyrics).mp3',
        songCover: 'https://img.youtube.com/vi/Gl0IPvyYZnY/maxresdefault.jpg',
    },
    {
        songTitle: 'Nightcore - Bad boy',
        songUrl:
            'https://pw-music-game-db.netlify.app/resources/nightcore%20-%20bad%20boy.mp3',
        songCover: 'https://img.youtube.com/vi/cmlCuzn_mqI/maxresdefault.jpg',
    },
    {
        songTitle: 'Nightcore - MONEY (Rock Version) (Lyrics)',
        songUrl:
            'https://pw-music-game-db.netlify.app/resources/nightcore%20-%20money%20(rock%20version)%20(lyrics).mp3',
        songCover: 'https://img.youtube.com/vi/mLo0B-KHKPo/maxresdefault.jpg',
    },
    {
        songTitle: 'Nightcore - Toxic (Rock Version) (Lyrics)',
        songUrl:
            'https://pw-music-game-db.netlify.app/resources/nightcore%20-%20toxic%20(rock%20version)%20(lyrics).mp3',
        songCover: 'https://img.youtube.com/vi/sfNUUtJSKKY/maxresdefault.jpg',
    },
    {
        songTitle: 'Nightcore ↬ Just Dance [ROCK VERSION | sped up]',
        songUrl:
            'https://pw-music-game-db.netlify.app/resources/nightcore%20-%20just%20dance%20(rock%20version)%20(sped%20up).mp3',
        songCover: 'https://img.youtube.com/vi/uXaExKJkP_g/maxresdefault.jpg',
    },
    {
        songTitle: 'Pretty Rave Girl 2010 - S3RL',
        songUrl:
            'https://pw-music-game-db.netlify.app/resources/pretty%20rave%20girl%202010%20-%20s3rl.mp3',
        songCover: 'https://img.youtube.com/vi/WaNwvukxz64/maxresdefault.jpg',
    },
    {
        songTitle: `Oliver Tree - Miss You (Bemax Cover Remix) I'm Your Treasure Box [AMV]`,
        songUrl:
            'https://pw-music-game-db.netlify.app/resources/oliver%20tree%20-%20miss%20you%20(bemax%20cover%20remix)%20i%E2%80%99m%20your%20treasure%20box%20[amv].mp3',
        songCover: 'https://img.youtube.com/vi/TOoC7aXkpMs/maxresdefault.jpg',
    },
]
let songNotes = []

function init() {
    function compareSongTitles(a, b) {
        const songTitleA = a.songTitle.toUpperCase()
        const songTitleB = b.songTitle.toUpperCase()

        if (songTitleA < songTitleB) {
            return -1
        }
        if (songTitleA > songTitleB) {
            return 1
        }
        return 0
    }

    data.sort(compareSongTitles)

    const totalTime = 360
    let currentTime = 2
    let aux = 1

    while (currentTime < totalTime) {
        currentTime += 0.25
        songNotes.push({
            type: `target-${aux}`,
            time: currentTime,
        })

        function gerarNumeroAleatorio() {
            const numeroDecimalAleatorio = Math.random()
            const numeroInteiroAleatorio = Math.floor(
                numeroDecimalAleatorio * 4
            )
            const numeroAleatorioDeUmAQuatro = numeroInteiroAleatorio + 1

            return numeroAleatorioDeUmAQuatro
        }
        aux = gerarNumeroAleatorio()
    }
    livePointerEvents()
    generatorContentSongs()
    allEventsListeners()
}

init()

function allEventsListeners() {
    document
        .querySelector('.main-container .container-home .logo')
        .addEventListener('click', () => {
            document.querySelector(
                '.main-container .container-home'
            ).style.display = 'none'
            document.querySelector(
                '.main-container .screen-flashlight'
            ).style.display = 'block'

            document
                .querySelector('.main-container .screen-flashlight')
                .addEventListener('animationend', (event) => {
                    if (event.animationName === 'animation-screen-flashlight') {
                        document.querySelector(
                            '.main-container .screen-flashlight'
                        ).style.display = 'none'
                    }
                })
            document.querySelector('.container-songs').style.display = 'block'
            setPreviewDifficulty(selectDifficulty)
        })

    document
        .querySelector('.main-container .main-container-failed .box .retry')
        .addEventListener('click', gameRetry)

    document
        .querySelector('.main-container-paused-option-retry')
        .addEventListener('click', gameRetry)

    document
        .querySelector('.main-container .container-song-completed .retry')
        .addEventListener('click', gamePostRetry)

    document
        .querySelector('.main-container .main-container-failed .box .exit')
        .addEventListener('click', gameExit)

    document
        .querySelector('.main-container-paused-option-exit')
        .addEventListener('click', gameExit)

    document
        .querySelector('.main-container .container-song-completed .exit')
        .addEventListener('click', gamePostExit)

    document
        .querySelector('.main-container-paused-option-resume')
        .addEventListener('click', gamePause)
}

function isElementOverlapping(element1, element2) {
    const rect1 = element1.getBoundingClientRect()

    for (let i = 0; i < element2.length; i++) {
        const rect2 = element2[i].getBoundingClientRect()

        // Verificar a sobreposição horizontal
        const horizontalOverlap =
            rect1.left < rect2.right && rect1.right > rect2.left

        // Verificar a sobreposição vertical
        const verticalOverlap =
            rect1.top < rect2.bottom && rect1.bottom > rect2.top

        // Retorna true se houver sobreposição tanto na horizontal quanto na vertical
        if (horizontalOverlap && verticalOverlap) {
            element2[i].remove()
            element1.classList.add('hit')
            element1.addEventListener('animationend', (event) => {
                if (
                    event.animationName === 'animation-hit-1' ||
                    event.animationName === 'animation-hit-2' ||
                    event.animationName === 'animation-hit-3' ||
                    event.animationName === 'animation-hit-4'
                ) {
                    const elemento = event.target
                    elemento.classList.remove('hit')
                }
            })
            livePoints++
            totalPoints += 50 * multiplicatorPoints
            totalNotes++
            livePointerEvents()
            totalPointsEvents()
            totalNotesEvents()
            controllerRateBars()
            consecutiveHitsEvents()
            consecutiveHits++
            return true
        }
    }

    // Se não houver sobreposição com nenhum dos elementos em element2, retornamos false
    return false
}

function animateElementDown(element, distance) {
    for (let i = 0; i < element.length; i++) {
        const startPosition = element[i].offsetTop
        const targetPosition = startPosition + distance
        const duration =
            selectDifficulty === 1
                ? 1200
                : selectDifficulty === 2
                ? 1000
                : selectDifficulty === 3
                ? 800
                : 600

        let startTime = null

        function step(timestamp) {
            if (!startTime) startTime = timestamp
            const progress = timestamp - startTime

            const percentage = Math.min(progress / duration, 1)
            const currentPosition = startPosition + percentage * distance

            element[i].style.top = currentPosition + 'px'

            if (element[i].offsetTop >= targetPosition) {
                element[i].remove()
                livePoints =
                    selectDifficulty === 1
                        ? (livePoints -= 1)
                        : selectDifficulty === 2
                        ? (livePoints -= 2)
                        : (livePoints -= 3)
                livePointerEvents()
                controllerRateBarsMissed()
            }

            if (progress < duration && gamePaused === false) {
                requestAnimationFrame(step)
            }
        }

        requestAnimationFrame(step)
    }
}

function createElementAtTime(type) {
    const element = document.createElement('div')
    element.classList = `target ${type}`
    containerTarget.appendChild(element)

    targets = document.querySelectorAll('.target')
    target1 = document.querySelectorAll('.target-1')
    target2 = document.querySelectorAll('.target-2')
    target3 = document.querySelectorAll('.target-3')
    target4 = document.querySelectorAll('.target-4')
    animateElementDown(targets, window.innerHeight + 140)
}

song.addEventListener('timeupdate', function () {
    const currentTime = song.currentTime

    songNotes.forEach((moment) => {
        if (currentTime >= moment.time && !moment.created) {
            createElementAtTime(moment.type)
            moment.created = true
        }
    })
})

function loadSong(songChange) {
    song.src = songChange.songUrl

    document.querySelector('.container-game').style.display = 'flex'
    document.querySelector('.counter-to-start').style.display = 'flex'
    document.querySelector('.container-songs').style.display = 'none'
    document.querySelector('.main-container .container').style.display = 'flex'
    document.querySelector('.content-info').style.display = 'block'
    document.querySelector('.content-info-2').style.display = 'block'
    document.querySelector(
        '.main-container .container-game-cover'
    ).style.display = 'block'
    document.querySelector('.main-container .screen-flashlight').style.display =
        'block'

    document
        .querySelectorAll(
            '.main-container .container-songs .content-songs .song'
        )
        .forEach((song) => {
            song.classList.remove('selected')
        })

    document
        .querySelector('.main-container .screen-flashlight')
        .addEventListener('animationend', (event) => {
            if (event.animationName === 'animation-screen-flashlight') {
                document.querySelector(
                    '.main-container .screen-flashlight'
                ).style.display = 'none'
            }
        })
    document.querySelector('.counter-to-start').textContent = 'Loading...'
    song.addEventListener('canplaythrough', () => {
        startCounting(songChange)
    })
}

function setSong(songChange) {
    song.play()
    songCover.style.setProperty(
        'background-image',
        `url("${songChange.songCover}")`
    )
    songTitle.textContent = songChange.songTitle
    livePoints = 51
    totalNotes = 0
    totalPoints = 0
    livePointerEvents()
    totalNotesEvents()
    totalPointsEvents()

    document
        .querySelector('.container-song-completed')
        .style.setProperty('background-image', `url("${songChange.songCover}")`)
}

song.addEventListener('ended', () => {
    if (livePoints <= 0) {
        return controllerFailed()
    }

    canActions = false
    canPause = false
    document.querySelector(
        '.main-container .container-song-completed'
    ).style.display = 'block'
    document.querySelector(
        '.main-container .container-song-completed .points'
    ).textContent = `Points: ${totalPoints}`

    function getDifficulty(selectDifficulty) {
        if (selectDifficulty === 1) {
            return 'Easy'
        } else if (selectDifficulty === 2) {
            return 'Medium'
        } else if (selectDifficulty === 3) {
            return 'Hard'
        } else {
            return 'Expert'
        }
    }

    const difficulty = getDifficulty(selectDifficulty)

    document.querySelector(
        '.main-container .container-song-completed .difficulty'
    ).textContent = `Difficulty: ${difficulty}`

    document.querySelector('.container-game').style.display = 'none'
    document.querySelector('.container-song-completed').s
    document.querySelector('.main-container .container').style.display = 'none'
    document.querySelector('.content-info').style.display = 'none'
    document.querySelector('.content-info-2').style.display = 'none'

    document.querySelector('.main-container .screen-flashlight').style.display =
        'block'

    document
        .querySelector('.main-container .screen-flashlight')
        .addEventListener('animationend', (event) => {
            if (event.animationName === 'animation-screen-flashlight') {
                document.querySelector(
                    '.main-container .screen-flashlight'
                ).style.display = 'none'
            }
        })
})

const teclasPermitidas = ['d', 'f', 'j', 'k', 'p']
let teclaJaPressionada = {} // Armazenar o estado de cada tecla

document.addEventListener('keydown', function (event) {
    const teclaPressionada = event.key.toLowerCase()

    // Verifica se a tecla pressionada está na lista de teclas permitidas e se já não foi pressionada antes
    if (
        teclasPermitidas.includes(teclaPressionada) &&
        !teclaJaPressionada[teclaPressionada] &&
        canActions
    ) {
        // Coloque aqui o código que você deseja executar quando uma das teclas for pressionada.
        if (teclaPressionada == 'd') {
            trail1.classList.add('pressed')
            if (!isElementOverlapping(trail1, target1)) {
                livePoints =
                    selectDifficulty === 1
                        ? (livePoints -= 1)
                        : selectDifficulty === 2
                        ? (livePoints -= 2)
                        : (livePoints -= 3)

                livePointerEvents()
                controllerRateBarsMissed()
            }
        }
        if (teclaPressionada == 'f') {
            trail2.classList.add('pressed')
            if (!isElementOverlapping(trail2, target2)) {
                livePoints =
                    selectDifficulty === 1
                        ? (livePoints -= 1)
                        : selectDifficulty === 2
                        ? (livePoints -= 2)
                        : (livePoints -= 3)
                livePointerEvents()
                controllerRateBarsMissed()
            }
        }
        if (teclaPressionada == 'j') {
            trail3.classList.add('pressed')
            if (!isElementOverlapping(trail3, target3)) {
                livePoints =
                    selectDifficulty === 1
                        ? (livePoints -= 1)
                        : selectDifficulty === 2
                        ? (livePoints -= 2)
                        : (livePoints -= 3)
                livePointerEvents()
                controllerRateBarsMissed()
            }
        }
        if (teclaPressionada == 'k') {
            trail4.classList.add('pressed')
            if (!isElementOverlapping(trail4, target4)) {
                livePoints =
                    selectDifficulty === 1
                        ? (livePoints -= 1)
                        : selectDifficulty === 2
                        ? (livePoints -= 2)
                        : (livePoints -= 3)
                livePointerEvents()
                controllerRateBarsMissed()
            }
        }

        teclaJaPressionada[teclaPressionada] = true
    }
})

document.addEventListener('keyup', function (event) {
    const teclaPressionada = event.key.toLowerCase()

    if (teclaPressionada == 'd') {
        trail1.classList.remove('pressed')
    }
    if (teclaPressionada == 'f') {
        trail2.classList.remove('pressed')
    }
    if (teclaPressionada == 'j') {
        trail3.classList.remove('pressed')
    }
    if (teclaPressionada == 'k') {
        trail4.classList.remove('pressed')
    }
    if (teclaPressionada == 'p') {
        gamePause()
    }

    teclaJaPressionada[teclaPressionada] = false
})

function livePointerEvents() {
    if (livePoints > 100) {
        livePoints = 100
    }
    livePointer.style.left = livePoints + '%'

    if (livePoints <= 33) {
        document
            .querySelector('.content-info .box .live .live-part-green')
            .classList.remove('hovered')
        document
            .querySelector('.content-info .box .live .live-part-yellow')
            .classList.remove('hovered')
        document
            .querySelector('.content-info .box .live .live-part-red')
            .classList.add('hovered')
    } else if (livePoints >= 66) {
        document
            .querySelector('.content-info .box .live .live-part-red')
            .classList.remove('hovered')
        document
            .querySelector('.content-info .box .live .live-part-yellow')
            .classList.remove('hovered')
        document
            .querySelector('.content-info .box .live .live-part-green')
            .classList.add('hovered')
    } else {
        document
            .querySelector('.content-info .box .live .live-part-red')
            .classList.remove('hovered')
        document
            .querySelector('.content-info .box .live .live-part-green')
            .classList.remove('hovered')
        document
            .querySelector('.content-info .box .live .live-part-yellow')
            .classList.add('hovered')
    }
    if (livePoints <= 20) {
        livePointer.classList.add('almost-failing')
    } else {
        livePointer.classList.remove('almost-failing')
    }
    if (livePoints <= 0) {
        controllerFailed()
    }
}

function totalPointsEvents() {
    document.querySelector('.content-info .box .score').textContent =
        totalPoints
}
function totalNotesEvents() {
    const formattedTotalNotes = String(totalNotes).padStart(3, '0')
    document.querySelector('.content-info-2 .box .notes-count').textContent =
        formattedTotalNotes
}

function startCounting(song) {
    document.querySelector('.counter-to-start').textContent = 'Ready?'

    setTimeout(() => {
        document.querySelector('.counter-to-start').textContent = 3
        setTimeout(() => {
            document.querySelector('.counter-to-start').textContent = 2
            setTimeout(() => {
                document.querySelector('.counter-to-start').textContent = 1
                setTimeout(() => {
                    document.querySelector('.counter-to-start').style.display =
                        'none'
                    setSong(song)
                    canActions = true
                    canPause = true
                }, 800)
            }, 800)
        }, 800)
    }, 1500)
}
function controllerFailed() {
    song.pause()
    canActions = false
    canPause = false
    gamePausedDelay = null
    document.querySelector(
        '.main-container .main-container-failed'
    ).style.display = 'flex'
}

let timerConsecutiveHits = null
function consecutiveHitsEvents() {
    if (
        (consecutiveHits % 50 === 0 && consecutiveHits !== 0) ||
        consecutiveHits === 20
    ) {
        if (timerConsecutiveHits) {
            clearTimeout(timerConsecutiveHits)
            timerConsecutiveHits = null
        }
        document.querySelector('.consecutive-hits').style.display = 'flex'
        document.querySelector(
            '.consecutive-hits'
        ).textContent = `${consecutiveHits} consecutive hits!`

        timerConsecutiveHits = setTimeout(() => {
            document.querySelector('.consecutive-hits').classList.add('fade')

            document
                .querySelector('.consecutive-hits')
                .addEventListener('animationend', (event) => {
                    if (
                        event.animationName ===
                        'animation-consecutive-hits-exit'
                    ) {
                        document
                            .querySelector('.consecutive-hits')
                            .classList.remove('fade')
                        document.querySelector(
                            '.consecutive-hits'
                        ).style.display = 'none'
                    }
                })
        }, 4000)
    }
}

function generatorContentSongs() {
    data.forEach((song) => {
        const songDiv = document.createElement('div')
        songDiv.classList.add('song')
        songDiv.style.setProperty(
            'background-image',
            `url("${song.songCover}")`
        )

        const previewDiv = document.createElement('div')
        previewDiv.classList.add('preview')
        previewDiv.addEventListener('click', () => {
            gameSongPreview(song)
            document
                .querySelectorAll(
                    '.main-container .container-songs .content-songs .song'
                )
                .forEach((song) => {
                    song.classList.remove('selected')
                })
            songDiv.classList.add('selected')
        })

        const divisionDiv = document.createElement('div')
        divisionDiv.classList.add('division')

        const titleDiv = document.createElement('div')
        titleDiv.classList.add('title')
        titleDiv.textContent = song.songTitle

        const contentDifficultyDiv = document.createElement('div')
        contentDifficultyDiv.classList.add('content-difficulty')

        const difficultyEasyDiv = document.createElement('div')
        difficultyEasyDiv.classList.add('difficulty-easy')
        difficultyEasyDiv.textContent = 'Easy'
        difficultyEasyDiv.addEventListener('click', () => {
            selectDifficulty = 1
            setPreviewDifficulty(selectDifficulty)
        })

        const difficultyMediumDiv = document.createElement('div')
        difficultyMediumDiv.classList.add('difficulty-medium')
        difficultyMediumDiv.textContent = 'Medium'
        difficultyMediumDiv.addEventListener('click', () => {
            selectDifficulty = 2
            setPreviewDifficulty(selectDifficulty)
        })

        const difficultyHardDiv = document.createElement('div')
        difficultyHardDiv.classList.add('difficulty-hard')
        difficultyHardDiv.textContent = 'Hard'
        difficultyHardDiv.addEventListener('click', () => {
            selectDifficulty = 3
            setPreviewDifficulty(selectDifficulty)
        })

        const difficultyExpertDiv = document.createElement('div')
        difficultyExpertDiv.classList.add('difficulty-expert')
        difficultyExpertDiv.textContent = 'Expert'
        difficultyExpertDiv.addEventListener('click', () => {
            selectDifficulty = 4
            setPreviewDifficulty(selectDifficulty)
        })

        const songPlayDiv = document.createElement('div')
        songPlayDiv.classList.add('song-play')
        songPlayDiv.textContent = 'Play'
        songPlayDiv.addEventListener('click', () => {
            gameSongPreviewStop()
            loadSong(song)
        })

        contentDifficultyDiv.appendChild(difficultyEasyDiv)
        contentDifficultyDiv.appendChild(difficultyMediumDiv)
        contentDifficultyDiv.appendChild(difficultyHardDiv)
        contentDifficultyDiv.appendChild(difficultyExpertDiv)

        divisionDiv.appendChild(titleDiv)
        divisionDiv.appendChild(contentDifficultyDiv)

        songDiv.appendChild(previewDiv)
        songDiv.appendChild(divisionDiv)
        songDiv.appendChild(songPlayDiv)

        contentSongs.appendChild(songDiv)
    })
}
function controllerRateBars() {
    const bars = document.querySelectorAll('.bars .bar')

    function divideAndExecute(num) {
        let numString = String(num)
        const number = Number(numString)

        if (number >= 39) {
            numString = String(39)
        }

        const leftPart =
            numString.length === 1 ? 0 : Number(numString.charAt(0))
        const rightPart =
            numString.length === 1
                ? Number(numString)
                : Number(numString.charAt(1))

        switch (leftPart) {
            case 0:
                functionForZeroLeftPart(rightPart)
                break
            case 1:
                functionForOneLeftPart(rightPart)
                break
            case 2:
                functionForTwoLeftPart(rightPart)
                break
            case 3:
                functionForThreeLeftPart(rightPart)
                break
        }
    }

    function functionForZeroLeftPart(rightPart) {
        bars[rightPart].classList.add('form-1')
        multiplicatorPoints = 1
        document.querySelector(
            '.content-info-2 .box .multiplicator-n'
        ).textContent = 1
    }

    function functionForOneLeftPart(rightPart) {
        bars[rightPart].classList.add('form-2')
        multiplicatorPoints = 2
        document.querySelector(
            '.content-info-2 .box .multiplicator-n'
        ).textContent = 2
    }

    function functionForTwoLeftPart(rightPart) {
        bars[rightPart].classList.add('form-3')
        multiplicatorPoints = 4
        document.querySelector(
            '.content-info-2 .box .multiplicator-n'
        ).textContent = 4
    }

    function functionForThreeLeftPart(rightPart) {
        bars[rightPart].classList.add('form-4')
        multiplicatorPoints = 8
        document.querySelector(
            '.content-info-2 .box .multiplicator-n'
        ).textContent = 8
    }

    divideAndExecute(consecutiveHits)
}
function controllerRateBarsMissed() {
    const bars = document.querySelectorAll('.bars .bar')
    consecutiveHits = 0
    multiplicatorPoints = 1
    document.querySelector(
        '.content-info-2 .box .multiplicator-n'
    ).textContent = 1

    bars.forEach((bar) => {
        bar.classList.remove('form-1', 'form-2', 'form-3', 'form-4')
    })
}
function gamePause() {
    if (gamePausedDelay || !canPause) {
        return
    }
    gamePausedDelay = setTimeout(() => {
        gamePausedDelay = null
    }, 1000)

    if (gamePaused === false) {
        gamePaused = true
        canActions = false
        song.pause()
        document.querySelector(
            '.main-container .main-container-paused'
        ).style.display = 'flex'
    } else {
        gamePaused = false
        canActions = true
        song.play()
        document.querySelector(
            '.main-container .main-container-paused'
        ).style.display = 'none'
    }
}

function gameRetry() {
    document.querySelector('.counter-to-start').style.display = 'flex'
    document.querySelector(
        '.main-container .container-game-cover'
    ).style.display = 'block'
    document.querySelector('.main-container .screen-flashlight').style.display =
        'block'
    document.querySelector(
        '.main-container .main-container-paused'
    ).style.display = 'none'

    document
        .querySelector('.main-container .screen-flashlight')
        .addEventListener('animationend', (event) => {
            if (event.animationName === 'animation-screen-flashlight') {
                document.querySelector(
                    '.main-container .screen-flashlight'
                ).style.display = 'none'
            }
        })
    document.querySelector(
        '.main-container .main-container-failed'
    ).style.display = 'none'

    livePoints = 51
    totalNotes = 0
    totalPoints = 0
    consecutiveHits = 0
    livePointerEvents()
    totalNotesEvents()
    totalPointsEvents()
    controllerRateBarsMissed()
    gamePaused = false
    canPause = false

    for (let i = 0; i < songNotes.length; i++) {
        delete songNotes[i].created
    }

    document.querySelectorAll('.target').forEach((target) => {
        target.remove()
    })

    document.querySelector('.counter-to-start').textContent = 'Ready?'

    setTimeout(() => {
        document.querySelector('.counter-to-start').textContent = 3
        setTimeout(() => {
            document.querySelector('.counter-to-start').textContent = 2
            setTimeout(() => {
                document.querySelector('.counter-to-start').textContent = 1
                setTimeout(() => {
                    document.querySelector('.counter-to-start').style.display =
                        'none'
                    song.currentTime = 0
                    song.play()
                    canActions = true
                    canPause = true
                }, 800)
            }, 800)
        }, 800)
    }, 1500)
}

function gamePostRetry() {
    document.querySelector('.container-game').style.display = 'flex'
    document.querySelector('.counter-to-start').style.display = 'flex'
    document.querySelector('.main-container .container').style.display = 'flex'
    document.querySelector('.content-info').style.display = 'block'
    document.querySelector('.content-info-2').style.display = 'block'
    document.querySelector(
        '.main-container .container-game-cover'
    ).style.display = 'block'
    document.querySelector('.main-container .screen-flashlight').style.display =
        'block'

    document
        .querySelector('.main-container .screen-flashlight')
        .addEventListener('animationend', (event) => {
            if (event.animationName === 'animation-screen-flashlight') {
                document.querySelector(
                    '.main-container .screen-flashlight'
                ).style.display = 'none'
            }
        })
    document.querySelector(
        '.main-container .container-song-completed'
    ).style.display = 'none'

    livePoints = 51
    totalNotes = 0
    totalPoints = 0
    consecutiveHits = 0
    livePointerEvents()
    totalNotesEvents()
    totalPointsEvents()
    controllerRateBarsMissed()

    for (let i = 0; i < songNotes.length; i++) {
        delete songNotes[i].created
    }

    document.querySelectorAll('.target').forEach((target) => {
        target.remove()
    })

    document.querySelector('.counter-to-start').textContent = 'Ready?'

    setTimeout(() => {
        document.querySelector('.counter-to-start').textContent = 3
        setTimeout(() => {
            document.querySelector('.counter-to-start').textContent = 2
            setTimeout(() => {
                document.querySelector('.counter-to-start').textContent = 1
                setTimeout(() => {
                    document.querySelector('.counter-to-start').style.display =
                        'none'
                    song.currentTime = 0
                    song.play()
                    canActions = true
                    canPause = true
                }, 800)
            }, 800)
        }, 800)
    }, 1500)
}

function gameExit() {
    document.querySelector('.main-container .container').style.display = 'none'
    document.querySelector('.content-info').style.display = 'none'
    document.querySelector('.content-info-2').style.display = 'none'
    document.querySelector(
        '.main-container .container-game-cover'
    ).style.display = 'none'
    document.querySelector('.main-container .screen-flashlight').style.display =
        'block'
    document.querySelector(
        '.main-container .main-container-paused'
    ).style.display = 'none'

    document
        .querySelector('.main-container .screen-flashlight')
        .addEventListener('animationend', (event) => {
            if (event.animationName === 'animation-screen-flashlight') {
                document.querySelector(
                    '.main-container .screen-flashlight'
                ).style.display = 'none'
            }
        })
    document.querySelector(
        '.main-container .main-container-failed'
    ).style.display = 'none'

    document.querySelector('.main-container .container-songs').style.display =
        'block'
    document.querySelector('.container-game').style.display = 'none'
    document.querySelector('.container-game').style.backgroundImage = 'none'

    livePoints = 51
    totalNotes = 0
    totalPoints = 0
    consecutiveHits = 0
    livePointerEvents()
    totalNotesEvents()
    totalPointsEvents()
    controllerRateBarsMissed()
    gamePaused = false
    canPause = false

    for (let i = 0; i < songNotes.length; i++) {
        delete songNotes[i].created
    }

    document.querySelectorAll('.target').forEach((target) => {
        target.remove()
    })
}

function gamePostExit() {
    document.querySelector(
        '.main-container .container-game-cover'
    ).style.display = 'none'
    document.querySelector('.main-container .screen-flashlight').style.display =
        'block'

    document
        .querySelector('.main-container .screen-flashlight')
        .addEventListener('animationend', (event) => {
            if (event.animationName === 'animation-screen-flashlight') {
                document.querySelector(
                    '.main-container .screen-flashlight'
                ).style.display = 'none'
            }
        })

    document.querySelector(
        '.main-container .container-song-completed'
    ).style.display = 'none'

    document.querySelector('.main-container .container-songs').style.display =
        'block'
    document.querySelector('.container-game').style.display = 'none'
    document.querySelector('.container-game').style.backgroundImage = 'none'

    livePoints = 51
    totalNotes = 0
    totalPoints = 0
    consecutiveHits = 0
    livePointerEvents()
    totalNotesEvents()
    totalPointsEvents()
    controllerRateBarsMissed()
    canPause = false

    for (let i = 0; i < songNotes.length; i++) {
        delete songNotes[i].created
    }

    document.querySelectorAll('.target').forEach((target) => {
        target.remove()
    })
}

let timerGameSongPreview = null
function gameSongPreview(songChange) {
    if (songPreviw.src === songChange.songUrl) {
        return
    }
    songPreviw.src = songChange.songUrl
    songPreviw.play()

    if (timerGameSongPreview) {
        clearTimeout(timerGameSongPreview)
        timerGameSongPreview = null
    }

    document.querySelector('.song-preview-details').classList.remove('hide')

    timerGameSongPreview = setTimeout(() => {
        songPreviwDetailsClose()
    }, 10000)

    document.querySelector('.song-preview-details').style.display = 'flex'
    document.querySelector(
        '.song-preview-details-title-song'
    ).textContent = `Song title: ${songChange.songTitle}`

    setPreviewDifficulty(selectDifficulty)

    document.querySelector('.song-preview-details-duration').textContent =
        'Song duration: --:--'

    songPreviw.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(songPreviw.duration / 60)
        const seconds = Math.floor(songPreviw.duration - minutes * 60)
        document.querySelector(
            '.song-preview-details-duration'
        ).textContent = `Song duration: ${minutes}m ${seconds}s`
    })
}

function gameSongPreviewStop() {
    songPreviw.pause()
    songPreviw.src = ''
    document.querySelector('.song-preview-details').classList.remove('hide')

    if (timerGameSongPreview) {
        clearTimeout(timerGameSongPreview)
        timerGameSongPreview = null
    }

    document.querySelector('.song-preview-details').classList.add('exit')
    document
        .querySelector('.song-preview-details.exit')
        .addEventListener('animationend', (event) => {
            if (event.animationName === 'animation-song-preview-details-exit') {
                document.querySelector('.song-preview-details').style.display =
                    'none'
                document
                    .querySelector('.song-preview-details')
                    .classList.remove('exit')
            }
        })
}

function songPreviwDetailsClose() {
    document.querySelector('.song-preview-details').classList.add('hide')
    document
        .querySelector('.song-preview-details')
        .addEventListener('click', () => {
            if (
                document
                    .querySelector('.song-preview-details')
                    .classList.contains('hide')
            ) {
                document
                    .querySelector('.song-preview-details')
                    .classList.remove('hide')
            }
        })
    timerGameSongPreview = null
}

function setPreviewDifficulty(selectDifficulty) {
    const difficulty =
        selectDifficulty === 1
            ? 'Easy'
            : selectDifficulty === 2
            ? 'Medium'
            : selectDifficulty === 3
            ? 'Hard'
            : 'Expert'

    if (difficulty === 'Easy') {
        document
            .querySelectorAll(
                '.difficulty-expert, .difficulty-hard, .difficulty-medium'
            )
            .forEach((difficulty) => {
                difficulty.classList.remove('selected')
            })
        document.querySelectorAll('.difficulty-easy').forEach((difficulty) => {
            difficulty.classList.add('selected')
        })
    }

    if (difficulty === 'Medium') {
        document
            .querySelectorAll(
                '.difficulty-expert, .difficulty-hard, .difficulty-easy'
            )
            .forEach((difficulty) => {
                difficulty.classList.remove('selected')
            })
        document
            .querySelectorAll('.difficulty-medium')
            .forEach((difficulty) => {
                difficulty.classList.add('selected')
            })
    }

    if (difficulty === 'Hard') {
        document
            .querySelectorAll(
                '.difficulty-expert, .difficulty-easy, .difficulty-medium'
            )
            .forEach((difficulty) => {
                difficulty.classList.remove('selected')
            })
        document.querySelectorAll('.difficulty-hard').forEach((difficulty) => {
            difficulty.classList.add('selected')
        })
    }

    if (difficulty === 'Expert') {
        document
            .querySelectorAll(
                '.difficulty-easy, .difficulty-hard, .difficulty-medium'
            )
            .forEach((difficulty) => {
                difficulty.classList.remove('selected')
            })
        document
            .querySelectorAll('.difficulty-expert')
            .forEach((difficulty) => {
                difficulty.classList.add('selected')
            })
    }

    document.querySelector(
        '.song-preview-details-difficulty'
    ).textContent = `Selected difficulty: ${difficulty}`
}
