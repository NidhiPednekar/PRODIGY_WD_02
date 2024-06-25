let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTime, 10);
    startStopButton.textContent = 'Pause';
    startStopButton.style.backgroundColor = '#dc3545';
    running = true;
}

function stopStopwatch() {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    startStopButton.textContent = 'Start';
    startStopButton.style.backgroundColor = '#007bff';
    running = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    difference = 0;
    display.textContent = '00:00:00.00';
    startStopButton.textContent = 'Start';
    startStopButton.style.backgroundColor = '#007bff';
    running = false;
    laps = [];
    updateLaps();
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let milliseconds = parseInt((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function recordLap() {
    if (running) {
        laps.push(formatTime(updatedTime));
        updateLaps();
    }
}

function updateLaps() {
    lapsContainer.innerHTML = laps.map((lap, index) => `<div>Lap ${index + 1}: ${lap}</div>`).join('');
}

startStopButton.addEventListener('click', () => {
    if (running) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
