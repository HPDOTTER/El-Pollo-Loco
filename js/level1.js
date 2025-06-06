/**
 * The ending x-coordinate for level 1.
 * Determines the horizontal range for the level.
 * @constant {number}
 */
const level_end_x = 4050;

/**
 * Initializes level 1 by creating a new Level instance with its enemies, clouds,
 * background objects, coins, and bottles.
 *
 * The Level instance is constructed with the following parameters:
 * - An array of enemy objects including one Endboss, multiple Chicken objects and SmallChicken objects.
 * - An array of Cloud objects.
 * - An array of BackgroundObject objects, arranged with custom x positions to create layered backgrounds.
 * - An array of Coin objects.
 * - An array of Bottle objects.
 * - The level's ending x-coordinate.
 *
 * After initializing, the global variable `level1` will reference the newly created Level object.
 */
function initLevel1() {
    level1 = new Level(
        [   
            new Endboss(level_end_x),
            new Chicken(level_end_x),
            new Chicken(level_end_x),
            new Chicken(level_end_x),
            new Chicken(level_end_x),
            new Chicken(level_end_x),
            new Chicken(level_end_x),
            new SmallChicken(level_end_x),
            new SmallChicken(level_end_x),
            new SmallChicken(level_end_x),
            new SmallChicken(level_end_x),
            new SmallChicken(level_end_x),
            new SmallChicken(level_end_x),
        ],
        [
            new Cloud(level_end_x),
            new Cloud(level_end_x),
            new Cloud(level_end_x),
            new Cloud(level_end_x),
            new Cloud(level_end_x),
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', -799), 
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -799),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -799),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -799),
            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/air.png', 799),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 799),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 799),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 799),
            new BackgroundObject('./img/5_background/layers/air.png', 799 * 2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 799 * 2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 799 * 2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 799 * 2),
            new BackgroundObject('./img/5_background/layers/air.png', 799 * 3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 799 * 3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 799 * 3),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 799 * 3),
            new BackgroundObject('./img/5_background/layers/air.png', 799 * 4),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 799 * 4),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 799 * 4),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 799 * 4),
            new BackgroundObject('./img/5_background/layers/air.png', 799 * 5),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 799 * 5),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 799 * 5),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 799 * 5),
        ],
        [
            new Coin(level_end_x),
            new Coin(level_end_x),
            new Coin(level_end_x),
            new Coin(level_end_x),
            new Coin(level_end_x),
        ],
        [
            new Bottle(level_end_x),
            new Bottle(level_end_x),
            new Bottle(level_end_x),
            new Bottle(level_end_x),
            new Bottle(level_end_x),
            new Bottle(level_end_x),
            new Bottle(level_end_x),
            new Bottle(level_end_x),
            new Bottle(level_end_x),
        ],
        level_end_x
    );
}