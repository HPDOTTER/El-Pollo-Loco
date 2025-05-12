let canvas;
let world;
let keyboard = new Keyboard();
let gameMuted = false;
let gameStarted = false;
let otherDirection = false; // global otherdirection, every MO has its own otherDirection, used as flag for the throwables
const backgroundMusic = new Audio('./audio/backgroundmusic.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    initLevel1();
    world = new World(canvas, Keyboard);
    document.getElementById('menu').style.display = 'none';
    document.getElementById('muteButton').style.display = 'inline-block';
    document.getElementById('pauseButton').style.display = 'inline-block';
    canvas.style.display = 'block';
    gameStarted = true;
    backgroundMusic.play()
    if (window.innerWidth <= 800) {
        document.getElementById('mobileButtonsdiv').style.visibility = 'visible';
    }
}

function stopGame() {
    stopAllIntervals();
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('playButton').style.display = 'inline-block';
    document.getElementById('mobileButtonsdiv').style.visibility = 'hidden';
}

function toggleMute() {
    gameMuted = !gameMuted;
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach(audio => {
        audio.muted = gameMuted;
    });
    backgroundMusic.muted = gameMuted;
    const muteButton = document.getElementById('muteButton');
    muteButton.style.backgroundImage = gameMuted ? "url('./img/assets/mute.png')" : "url('./img/assets/sound.png')";
}

function playGameSound(path, volume = 1.0, loop = false) {
    let sound = new Audio(path);
    sound.volume = volume;
    sound.muted = gameMuted;
    sound.loop = loop;
    sound.play();
    return sound;
}

function resumeGame() {
    resumeAllIntervals();
    document.getElementById('pauseButton').style.display = 'inline-block';
    document.getElementById('playButton').style.display = 'none';
}

function showInstructions() {
    div = document.getElementById('menu');
    div.innerHTML = instructionTemplate();
}

function toMainMenu() {
    stopAllIntervals();
    world = null;
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('popup').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('playButton').style.display = 'none';
    canvas.style.display = 'none';
    if (window.allIntervals) {
        window.allIntervals.forEach(intervalId => clearInterval(intervalId));
        window.allIntervals = [];
    }
    div = document.getElementById('menu');
    div.innerHTML = mainMenuTemplate();
}

function showImprint(){
    window.location.href = 'imprint.html';
}

function showGameOver() {
    stopAllIntervals();
    world = null;
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('popup').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('playButton').style.display = 'none';
    canvas.style.display = 'none';
    if (window.allIntervals) {
        window.allIntervals.forEach(intervalId => clearInterval(intervalId));
        window.allIntervals = [];
    }
    div = document.getElementById('menu');
    div.innerHTML = gameOverTemplate();
}

function showYouWin() {
    stopAllIntervals();
    world = null;
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('popup').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('playButton').style.display = 'none';
    canvas.style.display = 'none';
    if (window.allIntervals) {
        window.allIntervals.forEach(intervalId => clearInterval(intervalId));
        window.allIntervals = [];
    }
    div = document.getElementById('menu');
    div.innerHTML = youWinTemplate();
}

window.addEventListener("keydown", (e) => {
    if (e.code == 'ArrowRight' || e.code == 'KeyD') {
        Keyboard.RIGHT = true;
        }
    if (e.code == 'ArrowLeft' || e.code == 'KeyA') {
        Keyboard.LEFT = true;
        }
    if (e.code == 'Space') {
        Keyboard.SPACE = true;
        }
    if (e.code == 'ArrowUp' || e.code == 'KeyW') {
        Keyboard.UP = true;
        }
    if (e.code == 'ArrowDown' || e.code == 'KeyS') {
            Keyboard.DOWN = true;
        }    
});

window.addEventListener("keyup", (e) => {
    if (e.code == 'ArrowRight' || e.code == 'KeyD') {
        Keyboard.RIGHT = false;
        }
    if (e.code == 'ArrowLeft' || e.code == 'KeyA') {
        Keyboard.LEFT = false;
        }
    if (e.code == 'Space') {
        Keyboard.SPACE = false;
        }
    if (e.code == 'ArrowUp' || e.code == 'KeyW') {
        Keyboard.UP = false;
        }
    if (e.code == 'ArrowDown' || e.code == 'KeyS') {
            Keyboard.DOWN = false;
        }
});

window.addEventListener("keydown", (e) => {
    if (e.code == 'Escape' && gameStarted) {
        stopAllIntervals();
        const popup = document.getElementById('popup');
        popup.style.display = 'block';
        document.getElementById('confirmButton').addEventListener('click', () => {
            toMainMenu();
            gameStarted = false;
        });
        document.getElementById('cancelButton').addEventListener('click', () => {
            const popup = document.getElementById('popup');
            popup.style.display = 'none';
            resumeAllIntervals();
        });
    }
});

window.addEventListener("touchstart", (e) => {
    if (e.target.id === 'leftButton') {
        Keyboard.LEFT = true;
    }
    if (e.target.id === 'rightButton') {
        Keyboard.RIGHT = true;
    }
    if (e.target.id === 'jumpButton') {
        Keyboard.SPACE = true;
    }
    if (e.target.id === 'throwButton') {
        Keyboard.DOWN = true;
    }
});

window.addEventListener("touchend", (e) => {
    if (e.target.id === 'leftButton') {
        Keyboard.LEFT = false;
    }
    if (e.target.id === 'rightButton') {
        Keyboard.RIGHT = false;
    }
    if (e.target.id === 'jumpButton') {
        Keyboard.SPACE = false;
    }
    if (e.target.id === 'throwButton') {
        Keyboard.DOWN = false;
    }
});

