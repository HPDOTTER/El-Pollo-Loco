let intervals = [];

function setStoppableInterval(func, delay) {
    let id = setInterval(func, delay);
    intervals.push({ id, func, delay }); // Store the interval ID, function, and delay
}

function stopAllIntervals() {
    intervals.forEach(interval => clearInterval(interval.id)); // Clear all intervals
    // Keep the functions and delays for resuming later
}

function resumeAllIntervals() {
    intervals = intervals.map(interval => {
        let id = setInterval(interval.func, interval.delay); // Restart the interval
        return { ...interval, id }; // ... = spread operator to create a new object with the same properties and the new ID
    });
}