/**
 * @fileoverview Contains the main game functions including audio, UI updates, and event listeners.
 */

let canvas;
let world;
let keyboard = new Keyboard();
let gameMuted = sessionStorage.getItem("gameMuted") ? JSON.parse(sessionStorage.getItem("gameMuted")) : false;
let gameStarted = false;
let otherDirection = false;
let bgMusicAudio = createBackgroundMusic();


/**
 * Background music for the game.
 * @type {Audio}
 */ 
function createBackgroundMusic() {
    const bgMusic = new Audio('./audio/backgroundmusic.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.05;
    return bgMusic;
}


/**
 * Initializes the game by retrieving the canvas element.
 */
function init() {
    canvas = document.getElementById('canvas');
    if (sessionStorage.getItem("gameMuted") === null) {
        sessionStorage.setItem("gameMuted", JSON.stringify(false));
    }
    const audioElements = document.querySelectorAll("audio");
        audioElements.forEach(audio => {
    audio.muted = gameMuted;
    });
    bgMusicAudio.muted = gameMuted;
    this.createBackgroundMusic();
    setInterval(checkRotateNotice, 1000);
}

/**
 * Starts the game by initializing level 1, creating the world, updating UI elements,
 * and playing the background music.
 */
function startGame() {
    initLevel1();
    world = new World(canvas, Keyboard);
    document.getElementById('menu').style.display = 'none';
    document.getElementById('muteButton').style.display = 'inline-block';
    document.getElementById('pauseButton').style.display = 'inline-block';
    canvas.style.display = 'block';
    gameStarted = true;
    bgMusicAudio.play();
    if (window.innerWidth <= 940) {
        document.getElementById('mobileButtonsdiv').style.visibility = 'visible';
    }
    updateMuteButtonState();
}

/**
 * Stops the game, stops all intervals, and updates the UI accordingly.
 */
function stopGame() {
    stopAllIntervals();
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('playButton').style.display = 'inline-block';
}

/**
 * Resumes the game by restarting all intervals and updating button displays.
 */
function resumeGame() {
    resumeAllIntervals();
    document.getElementById('pauseButton').style.display = 'inline-block';
    document.getElementById('playButton').style.display = 'none';
    gameStarted = true;
}

/**
 * Toggles the mute state for all audio elements including the background music.
 * Updates the state in session storage and changes the mute button's background image accordingly.
 */
function toggleMute() {
    gameMuted = !gameMuted;
    sessionStorage.setItem("gameMuted", JSON.stringify(gameMuted));
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach(audio => {
        audio.muted = gameMuted;
    });
    bgMusicAudio.muted = gameMuted;
    const muteButton = document.getElementById('muteButton');
    muteButton.style.backgroundImage = gameMuted ? "url('./img/assets/mute.png')" : "url('./img/assets/sound.png')";
    if (gameMuted && world.character.snoringSound) {
        world.character.snoringSound.pause();
        world.character.snoringSound.currentTime = 0;
        world.character.snoringSound = null;
    }
}

/**
 * Updates the mute button's background image based on the current mute state
 * stored in session storage. If gameMuted is true, the button shows the mute image;
 * otherwise, it shows the sound image.
 */
function updateMuteButtonState() {
    const currentMuteState = JSON.parse(sessionStorage.getItem("gameMuted"));
    const muteButton = document.getElementById('muteButton');

    if (muteButton) {
        muteButton.style.backgroundImage = currentMuteState 
            ? "url('./img/assets/mute.png')" 
            : "url('./img/assets/sound.png')";
    }
}

/**
 * Plays a game sound.
 * @param {string} path - The file path to the audio file.
 * @param {number} [volume=1.0] - The volume for the sound (range 0.0-1.0).
 * @param {boolean} [loop=false] - Whether the sound should loop.
 * @returns {Audio} The audio object that was played.
 */
function playGameSound(path, volume = 1.0, loop = false) {
    let sound = new Audio(path);
    sound.volume = volume;
    sound.muted = gameMuted;
    sound.loop = loop;
    sound.play();
    return sound;
}

/**
 * Replaces the menu content with the instructions overlay.
 */
function showInstructions() {
    const div = document.getElementById('menu');
    div.innerHTML = instructionTemplate();
}

/**
 * Returns to the main menu by stopping all intervals, clearing game data, updating UI,
 * and reloading the main menu template.
 */
function toMainMenu() {
    stopAllIntervals();
    world = null;
    hideAllPopupsAndButtons();
    canvas.style.display = 'none';
    const div = document.getElementById('menu');
    div.innerHTML = mainMenuTemplate();
}

/**
 * Redirects to the imprint page.
 */
function showImprint() {
    window.location.href = './imprint.html';
}

/**
 * Displays the game over screen by stopping the game, clearing intervals,
 * and updating the UI with the game over template.
 */
function showGameOver() {
    stopAllIntervals();
    world = null;
    hideAllPopupsAndButtons();
    canvas.style.display = 'none';
    const div = document.getElementById('menu');
    div.innerHTML = gameOverTemplate();
}

/**
 * Displays the win screen by stopping the game, clearing intervals,
 * and updating the UI with the win game template.
 */
function showYouWin() {
    stopAllIntervals();
    world = null;
    hideAllPopupsAndButtons();
    canvas.style.display = 'none';
    const div = document.getElementById('menu');
    div.innerHTML = youWinTemplate();
}

/**
 * Hides all popup elements and control buttons, and resets the menu display.
 */
function hideAllPopupsAndButtons() {
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('popup').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('playButton').style.display = 'none';
    document.getElementById('muteButton').style.display = 'none';
    document.getElementById('mobileButtonsdiv').style.visibility = 'hidden';
}

/**
 * Handles keyboard events to set flags for character movement.
 * The flags are set based on arrow keys and WASD keys.
 * The UP key is also set for jumping, and DOWN for throwing.
 * The SPACE key is used for jumping as well.
 * @typedef {Object} Keyboard
 * @property {boolean} RIGHT - Flag for moving right.
 * @property {boolean} LEFT - Flag for moving left.
 * @property {boolean} UP - Flag for jumping.
 * @property {boolean} DOWN - Flag for throwing.
 * @property {boolean} SPACE - Flag for jumping.
*/
window.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        Keyboard.RIGHT = true;
    }
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        Keyboard.LEFT = true;
    }
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
        Keyboard.UP = true;
    }
    if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        Keyboard.DOWN = true;
    }    
});

window.addEventListener("keyup", (e) => {
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        Keyboard.RIGHT = false;
    }
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        Keyboard.LEFT = false;
    }
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
        Keyboard.UP = false;
    }
    if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        Keyboard.DOWN = false;
    }
});

/**
 * Listens for the Escape key to trigger the pause menu.
 */
window.addEventListener("keydown", (e) => {
    if (e.code === 'Escape' && gameStarted) {
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


/**
 * Handles touch start events to set keyboard flags based on pressed buttons.
 */
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

/**
 * Handles touch end events to reset keyboard flags when buttons are released.
 */
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

/** * Prevents the default context menu from appearing on right-click for a specific element.
 * This is useful for mobile devices where long-press actions might interfere with game controls.
 */
document.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.getElementById('canvas');
    if (canvasElement) {
        canvasElement.oncontextmenu = function(event) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            return false;
        };
    }
});

// Check every 100 milliseconds if the rotate notice is visible.
function checkRotateNotice() {
    const rotateNotice = document.getElementById('rotate-notice');
    if (rotateNotice && getComputedStyle(rotateNotice).display === 'flex') {
        // If the game is running and the rotate notice is visible, stop the game.
        if (gameStarted) {
            stopGame();
            console.log("Game stopped due to rotate notice.");
            gameStarted = false;
        }
    }
}
