function instructionTemplate() {
    return `
        <div>
            <button class="backtomenu" onclick="toMainMenu()">X</button>
            <h1>Instructions</h1>
            <p>
                Use the arrow keys to move the character. Use the space key to jump.
                Collect coins and avoid enemies. You can throw bottles with the down
                arrow key. Good luck!
            </p>
        </div>
    `;
}

function mainMenuTemplate() {
    return `
        <div>
            <button onclick="startGame()">Start Game</button>
            <button onclick="showInstructions()">Instructions</button>
            <button onclick="showCredits()">Credits</button>
        </div>
    `;
}

function creditsTemplate() {
    return `
        <div>
            <button class="backtomenu" onclick="toMainMenu()">X</button>
            <h1>Credits</h1>
            <p>
                Developed by: <br>
                <p>Johannes Nordmann</p>
            </p>
        </div>
    `;
}