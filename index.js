const threshold = {
  FULL_DASH_ARRAY: 283,
  WARNING_THRESHOLD: 10,
  ALERT_THRESHOLD: 5,
};
const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: threshold.WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: threshold.ALERT_THRESHOLD,
  },
};
const val = {
  isStarted: false,
  timeLimit: 0,
  timePassed: 0,
  timeLeft: 0,
  timerInterval: null,
  remainingPathColor: COLOR_CODES.info.color,
};

const initHtml = `<div class="base-timer">
<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
    <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${val.remainingPathColor}"
        d="
        M 50, 50
        m -45, 0
        a 45,45 0 1,0 90,0
        a 45,45 0 1,0 -90,0
        "
    ></path>
    </g>
</svg>
<span id="base-timer-label" class="base-timer__label">${formatTime(
  val.timeLeft
)}</span>
</div>`;
const input = document.getElementById("input");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");

function makeInitClock() {
  document.getElementById("clock").innerHTML = initHtml;
}

makeInitClock();
startButton.addEventListener("click", function () {
  startTimer();
});

// input.addEventListener("keydown", function (event) {
//   if (event.code != "Enter") {
//     return;
//   }
//   startTimer(input.value);
// });

resetButton.addEventListener("click", function () {
  stopTimer();
  makeInitClock();
});

function onTimesUp() {
  stopTimer();
  soundOfTimerEnds();
  makeInitClock();
}

function tickTimer() {
  val.timePassed = val.timePassed += 1;
  val.timeLeft = val.timeLimit - val.timePassed;
  document.getElementById("base-timer-label").innerHTML = formatTime(
    val.timeLeft
  );
  setCircleDasharray(val.timeLimit, val.timeLeft);
  setRemainingPathColor(val.timeLeft);

  if (val.timeLeft <= 0) {
    onTimesUp();
  }
}
function validateTimeLimit(timeLimit) {
  if (!Number.isInteger(timeLimit) || timeLimit == null || timeLimit <= 0) {
    alert("Please enter positive number");
    return;
  }
}

function startTimer() {
  if (val.isStarted) {
    return;
  }
  // Convert minutes to seconds
  val.timeLimit = input.value * 60;
  validateTimeLimit(val.timeLimit);

  val.isStarted = true;
  val.timePassed = 0;
  val.timeLeft = val.timeLimit;

  val.timerInterval = setInterval(() => {
    tickTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(val.timerInterval);
  val.isStarted = false;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction(timeLimit, timeLeft) {
  const rawTimeFraction = timeLeft / timeLimit;
  return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
}

function setCircleDasharray(timeLimit, timeLeft) {
  const circleDasharray = `${(
    calculateTimeFraction(timeLimit, timeLeft) * threshold.FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function soundOfTimerEnds() {
  var audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.play();
}


if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
  