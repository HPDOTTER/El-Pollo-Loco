/**
 * The ending x-coordinate for level 1.
 * Determines the horizontal range for the level.
 * @constant {number}
 */
const level_end_x = 4050;

/**
 * Creates an array of enemy objects for the level.
 * Each enemy is positioned at the end of the level.
 * @returns {Enemy[]} An array of Enemy objects.
 */
function createEnemies() {
    return [
        new Endboss(level_end_x),
        ...Array(6).fill().map(() => new Chicken(level_end_x)),
        ...Array(6).fill().map(() => new SmallChicken(level_end_x)),
    ];
}

/**
 * Creates an array of cloud objects for the level.
 * Each cloud is positioned at the end of the level.
 * @returns {Cloud[]} An array of Cloud objects.
*/
function createClouds() {
    return Array(5).fill().map(() => new Cloud(level_end_x));
}

/**
 * Creates an array of background objects for the level.
 * Each object is positioned at the end of the level.
 * @returns {BackgroundObject[]} An array of BackgroundObject instances.
 */
function createBackgroundObjects() {
    const layers = [
        ['./img/5_background/layers/air.png', './img/5_background/layers/3_third_layer/2.png', './img/5_background/layers/2_second_layer/2.png', './img/5_background/layers/1_first_layer/2.png'],
        ['./img/5_background/layers/air.png', './img/5_background/layers/3_third_layer/1.png', './img/5_background/layers/2_second_layer/1.png', './img/5_background/layers/1_first_layer/1.png'],
    ];
    const objects = [];
    for (let i = -1; i <= 5; i++) {
        const set = layers[i % 2 === 0 ? 0 : 1];
        set.forEach((src, idx) => {
            objects.push(new BackgroundObject(src, 799 * i));
        });
    }
    return objects;
}

/**
 * Creates an array of Coin objects for the level.
 * Each coin is positioned at the end of the level.
 * @returns {Coin[]} An array of Coin objects.
 */
function createCoins() {
    return Array(5).fill().map(() => new Coin(level_end_x));
}

/**
 * Creates an array of Bottle objects for the level.
 * Each bottle is positioned at the end of the level.
 * @returns {Bottle[]} An array of Bottle objects.
 */
function createBottles() {
    return Array(9).fill().map(() => new Bottle(level_end_x));
}

/**
 * Initializes level 1 with enemies, clouds, background objects, coins, bottles, and the end position.
 * This function is called to set up the first level of the game.
 */
function initLevel1() {
    level1 = new Level(
        createEnemies(),
        createClouds(),
        createBackgroundObjects(),
        createCoins(),
        createBottles(),
        level_end_x
    );
}
