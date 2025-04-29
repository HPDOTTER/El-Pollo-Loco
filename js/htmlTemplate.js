function instructionTemplate() {
    return `
        <div class="menudiv">
            <div class="textarea">
                <button class="backtomenu" onclick="toMainMenu()">X</button>
                <h2>Instructions</h1>
                <p>
                    Use the arrow keys to move the character. Use the space key to jump.
                    Collect coins and avoid enemies. You can throw bottles with the down
                    arrow key. Good luck!
                </p>
            </div>
        </div>
    `;
}

function mainMenuTemplate() {
    return `
        <div class="menudiv">
            <button onclick="startGame()">Start Game</button>
            <button onclick="showInstructions()">Instructions</button>
            <button onclick="showCredits()">Credits</button>
        </div>
    `;
}

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

function gameOverTemplate() {
    return `
        <div class="gameover">
            <button class="backtomenu" onclick="toMainMenu()">X</button>
        </div>
    `;
}

function youWinTemplate() {
    return `
        <div class="wongame">
            <button class="backtomenu" onclick="toMainMenu()">X</button>
        </div>
    `;
}