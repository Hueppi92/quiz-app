let currentQuestion = 0;
let currentQuestionMarker = 1;
let result = 0;
let clicked = false;
let AUDIO_SUCCESS = new Audio('./assets/sounds/success.mp3');
let AUDIO_FAIL = new Audio('./assets/sounds/fail.mp3');
let AUDIO_ENDMUSIC = new Audio('./assets/sounds/magic.mp3');
const endScreen = document.getElementById("endScreen");

function init() {
    document.getElementById("next").classList.add("disabled");
  AUDIO_ENDMUSIC.pause();
  AUDIO_ENDMUSIC.currentTime = 0;
  endScreen.style.display = "none";
  currentQuestion = 0;
  currentQuestionMarker = 1;
  result = 0;
  clicked = false;
  const questionBody = document.getElementById("questionBody");
  questionBody.style.display = "";
  renderProgressBar();
  countQuestions();
  showQuestion();
}

function showQuestion() {
  resetRightWrongMarker();

  let question = questions[currentQuestion];
  document.getElementById("questionText").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function nextQuestion() {
AUDIO_FAIL.pause();
AUDIO_FAIL.currentTime = 0;
AUDIO_SUCCESS.pause();
AUDIO_SUCCESS.currentTime = 0;
  if (currentQuestion === questions.length - 1) {
    AUDIO_ENDMUSIC.play();
    renderEndScreen();
    return;
  }
  currentQuestion += 1;
  currentQuestionMarker += 1;
  document.getElementById("currentQuestion").innerHTML = currentQuestionMarker;
  clicked = false;
  showQuestion();
  document.getElementById("next").classList.add("disabled");
}

function countQuestions() {
  let count = questions.length;
  let counter = document.getElementById("questionCounter");
  counter.innerHTML = count;
  let currentCount = (document.getElementById("currentQuestion").innerHTML =
    currentQuestionMarker);
}

function checkAnswer(answerId) {
  if (clicked) return;
  const question = questions[currentQuestion];
  const rightAnswerId = question.right_answer;
  resetRightWrongMarker();  
  let progressId = `progressImg_${currentQuestion}`;
  const selectedEl = document.getElementById(answerId);
  const correctEl = document.getElementById(rightAnswerId);
  if (answerId === rightAnswerId) {
    result++;
    selectedEl.parentNode.classList.add("bg-success");
    document.getElementById(progressId).classList.add("bg-success");
    const progressImgEl = document.getElementById(progressId);
    progressImgEl.src = "./assets/logo/progress-logo-right.JPG";
    AUDIO_SUCCESS.play();
  } else {
    selectedEl.parentNode.classList.add("bg-danger");
    correctEl.parentNode.classList.add("bg-success");
    const progressImgEl = document.getElementById(progressId);
    progressImgEl.src = "./assets/logo/progress-logo-wrong.JPG";
    AUDIO_FAIL.play();
  }
  document.getElementById("next").classList.remove("disabled");
  clicked = true;
}

function resetRightWrongMarker() {
  document.querySelectorAll(".bg-success, .bg-danger").forEach((el) => {
    el.classList.remove("bg-success", "bg-danger");
  });
}

function renderEndScreen() {
  const questionBody = document.getElementById("questionBody");
  questionBody.style.display = "none";
  if (result <= questions.length * 0.25) {
    trophySrc = "bronce";
  } else if (result >= questions.length * 0.75) {
    trophySrc = "gold";
  } else {
    trophySrc = "silver";
  }
  if (trophySrc === "gold") {
    message = "Fantastisch! Du bist ein echter Quiz-Meister!";
  } else if (trophySrc === "silver") {
    message = "Gut gemacht! Da geht noch mehr!";
  } else {
    message = "Übung macht den Meister! Versuch es gleich nochmal.";
  }
  endScreen.innerHTML = `<h3>${message}</h3> 
      <img id="trophy" src="./assets/img/trophy_${trophySrc}.png">
      <p>Deine Punktzahl lautet: ${result} / ${questions.length}</p> 
      <button class="btn btn-light" onclick="init()">Neustart</button>`;
  endScreen.style.display = "flex";
}

function renderProgressBar() {
  let progressBar = document.getElementById("progressBar");
  if (!progressBar) {
    console.error("Das Element mit der ID 'progressBar' wurde nicht gefunden!");
    return;
  }
  progressBar.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    progressBar.innerHTML += `<img id="progressImg_${i}" src="./assets/logo/progress-logo.JPG" class="card-img-top" alt="...">`;
  }
}
