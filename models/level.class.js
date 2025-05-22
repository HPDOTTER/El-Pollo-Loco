/**
 * Represents a game level containing enemies, clouds, background objects, coins, and bottles.
 * Also defines the end boundary (x-coordinate) of the level.
 * @class
 */
class Level {
    /**
     * Array of enemy objects present in the level.
     * @type {Array} enemies
     * @type {Array} clouds
     * @type {Array} backgroundObjects
     * @type {Array} coins
     * @type {Array} bottles
     * @type {number} level_end_x
     */
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x;
    
    /**
     * Creates an instance of Level.
     *
     * @param {Array} enemies - An array of enemy objects.
     * @param {Array} clouds - An array of cloud objects.
     * @param {Array} backgroundObjects - An array of background objects.
     * @param {Array} coins - An array of coin objects.
     * @param {Array} bottles - An array of bottle objects.
     * @param {number} level_end_x - The x-coordinate where the level ends.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles, level_end_x) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.level_end_x = level_end_x;
    }
}