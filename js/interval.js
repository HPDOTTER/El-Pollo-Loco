/**
 * @fileoverview Provides functions to set, stop, and resume intervals.
 * This module allows intervals to be managed so that they can
 * be stopped and later resumed.
 */

/**
 * Array to store active intervals along with their associated function and delay.
 * @type {Array<{id: number, func: Function, delay: number}>}
 */
let intervals = [];

/**
 * Sets an interval that can later be stopped and resumed.
 * The interval's ID, function, and delay are stored in the global `intervals` array.
 *
 * @param {Function} func - The function to be executed repeatedly.
 * @param {number} delay - The delay in milliseconds between executions.
 */
function setStoppableInterval(func, delay) {
    let id = setInterval(func, delay);
    intervals.push({ id, func, delay });
}

/**
 * Stops all intervals that were set using `setStoppableInterval`.
 * The intervals remain stored in the array for possible resumption.
 */
function stopAllIntervals() {
    intervals.forEach(interval => clearInterval(interval.id));
}

/**
 * Resumes all intervals that were previously stopped.
 * Each interval is restarted with its original function and delay,
 * and the stored interval objects are updated with the new interval IDs.
 */
function resumeAllIntervals() {
    intervals = intervals.map(interval => {
        let id = setInterval(interval.func, interval.delay);
        return { ...interval, id };
    });
}