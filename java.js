let isRunning = false;
let startTime;
let lapTimes = [];

function startStop() {
  if (isRunning) {
    isRunning = false;
    clearInterval(interval);
  } else {
    isRunning = true;
    startTime = new Date().getTime() - totalPausedTime;
    interval = setInterval(updateTime, 1000);
  }
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  totalPausedTime = 0;
  lapTimes = [];
  updateDisplay(0);
  document.getElementById('lapContainer').innerHTML = '';
}

function lap() {
  if (isRunning) {
    const lapTime = new Date().getTime() - startTime - totalPausedTime;
    lapTimes.push(formatTime(lapTime));
    updateLapDisplay();
  }
}

function updateTime() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime - totalPausedTime;
  updateDisplay(elapsedTime);
}

function updateDisplay(time) {
  const formattedTime = formatTime(time);
  document.getElementById('stopwatch').innerText = formattedTime;
}

function updateLapDisplay() {
  const lapContainer = document.getElementById('lapContainer');
  lapContainer.innerHTML = '';
  for (let i = 0; i < Math.min(8, lapTimes.length); i++) {
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap');
    lapElement.innerText = `Lap ${i + 1}: ${lapTimes[i]}`;
    lapContainer.appendChild(lapElement);
  }
}

function formatTime(time) {
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / (1000 * 60)) % 60;
  const hours = Math.floor(time / (1000 * 60 * 60));
  return (
    padNumber(hours) + ':' + padNumber(minutes) + ':' + padNumber(seconds)
  );
}

function padNumber(num) {
  return num.toString().padStart(2, '0');
}

let interval;
let totalPausedTime = 0;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    if (isRunning) {
      clearInterval(interval);
      totalPausedTime += new Date().getTime() - startTime;
    }
  } else {
    if (isRunning) {
      startTime = new Date().getTime() - totalPausedTime;
      interval = setInterval(updateTime, 1000);
    }
  }
});
