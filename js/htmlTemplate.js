/**
 * Returns the HTML template for the instructions overlay.
 * @returns {string} HTML string representing the instructions overlay.
 */
function instructionTemplate() {
    return `
        <div class="menudiv">
            <div class="textarea">
                <button class="backtomenu" onclick="toMainMenu()">X</button>
                <h2>Instructions</h1>
                <p>
                    Use the arrow/AD keys to move the character. Use the space/W key to jump.
                    Collect coins and avoid enemies. You can throw bottles with the down
                    arrow or S key. Good luck!
                </p>
            </div>
        </div>
    `;
}

/**
 * Returns the HTML template for the main menu.
 * @returns {string} HTML string representing the main menu.
 */
function mainMenuTemplate() {
    return `
        <div class="menudiv">
            <button onclick="startGame()">Start Game</button>
            <button onclick="showInstructions()">Instructions</button>
            <button onclick="showImprint()">Imprint</button>
        </div>
    `;
}

/**
 * Returns the HTML template for the credits overlay.
 * @returns {string} HTML string representing the credits overlay.
 */
function creditsTemplate() {
    return `
        <div class="menudiv">
            <div class="textarea">
                <button class="backtomenu" onclick="toMainMenu()">X</button>
                <h2>Credits</h1>
                <p>
                    Developed by: <br>
                    <p>Johannes Nordmann</p>
                </p>
            </div>
        </div>
    `;
}

/**
 * Returns the HTML template for the game over screen.
 * @returns {string} HTML string representing the game over screen.
 */
function gameOverTemplate() {
    return `
        <div class="menudiv">
            <div class="gameover">
                <button class="backtomenu" onclick="toMainMenu()">X</button>
            </div>
        </div>
    `;
}

/**
 * Returns the HTML template for the winning screen.
 * @returns {string} HTML string representing the winning screen.
 */
function youWinTemplate() {
    return `
        <div class="menudiv">
            <div class="wongame">
                <button class="backtomenu" onclick="toMainMenu()">X</button>
            </div>
        </div>
    `;
}