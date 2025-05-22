/**
 * Represents a status bar used for displaying health, bottles, coins, or boss status.
 * Extends DrawableObject to inherit drawing capabilities.
 * Loads the appropriate image set based on the type and updates the displayed percentage.
 *
 * @class
 * @extends DrawableObject
 */
class Statusbars extends DrawableObject {

    /**
     * Array of image paths for the health status bar.
     * @type {string[]}
     */
    HEALTH_IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    /**
     * Array of image paths for the bottle status bar.
     * @type {string[]}
     */
    BOTTLE_IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    /**
     * Array of image paths for the coin status bar.
     * @type {string[]}
     */
    COIN_IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    /**
     * Array of image paths for the boss status bar.
     * @type {string[]}
     */
    BOSS_IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/green/green0.png',
        './img/7_statusbars/2_statusbar_endboss/green/green20.png',
        './img/7_statusbars/2_statusbar_endboss/green/green40.png',
        './img/7_statusbars/2_statusbar_endboss/green/green60.png',
        './img/7_statusbars/2_statusbar_endboss/green/green80.png',
        './img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];

    /**
     * Creates an instance of Statusbars.
     *
     * @constructor
     * @param {string} type - The type of status bar ('health', 'bottle', 'coin', or 'boss').
     * @param {number} percentage - The initial percentage value (0 to 100) to be displayed.
     */
    constructor(type, percentage) {
        super();
        this.width = 200;
        this.height = 50;
        this.x = 30;

        switch (type) {
            case 'health':
                this.loadImages(this.HEALTH_IMAGES);
                this.setHealthPercentage(percentage);
                this.y = 0;
                break;
            case 'bottle':
                this.loadImages(this.BOTTLE_IMAGES);
                this.setBottlePercentage(percentage);
                this.y = 50;
                break;
            case 'coin':
                this.loadImages(this.COIN_IMAGES);
                this.setCoinPercentage(percentage);
                this.y = 100;
                break;
            case 'boss':
                this.loadImages(this.BOSS_IMAGES);
                this.setBossPercentage(percentage);
                this.y = 102;
                this.x = 570;
                break;
        }
    }

    /**
     * Sets the health percentage and updates the displayed image accordingly.
     *
     * @param {number} value - The health percentage (0 to 100).
     */
    setHealthPercentage(value) {
        this.health_percentage = value;
        this.img = this.imageCache[this.HEALTH_IMAGES[this.resolveImageIndex(value)]];
    }

    /**
     * Sets the bottle percentage and updates the displayed image accordingly.
     *
     * @param {number} value - The bottle percentage (0 to 100).
     */
    setBottlePercentage(value) {
        this.bottle_percentage = value;
        this.img = this.imageCache[this.BOTTLE_IMAGES[this.resolveImageIndex(value)]];
    }

    /**
     * Sets the coin percentage and updates the displayed image accordingly.
     *
     * @param {number} value - The coin percentage (0 to 100).
     */
    setCoinPercentage(value) {
        this.coin_percentage = value;
        this.img = this.imageCache[this.COIN_IMAGES[this.resolveImageIndex(value)]];
    }

    /**
     * Sets the boss percentage and updates the displayed image accordingly.
     *
     * @param {number} value - The boss percentage (0 to 100).
     */
    setBossPercentage(value) {
        this.boss_percentage = value;
        this.img = this.imageCache[this.BOSS_IMAGES[this.resolveImageIndex(value)]];
    }

    /**
     * Resolves the index of the image to display based on the given percentage.
     *
     * @param {number} value - The percentage value (0 to 100).
     * @returns {number} The index corresponding to the image to display.
     */
    resolveImageIndex(value) {
        if (value >= 100) {
            return 5;
        } else if (value >= 80) {
            return 4;
        } else if (value >= 60) {
            return 3;
        } else if (value >= 40) {
            return 2;
        } else if (value >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}