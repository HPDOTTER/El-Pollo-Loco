let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let otherDirection = false; // global otherdirection, every MO has its own otherDirection

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    initLevel1();
    world = new World(canvas, Keyboard);
    document.getElementById('menu').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'inline-block';
    canvas.style.display = 'block';
    gameStarted = true;
}

function stopGame() {
    stopAllIntervals();
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('playButton').style.display = 'inline-block';
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

function showCredits(){
    div = document.getElementById('menu');
    div.innerHTML = creditsTemplate();
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
        stopAllIntervals(); // Stop all intervals
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

