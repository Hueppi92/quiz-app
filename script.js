let questions = [
  {
    question: "Wie heißt die Zauberschule, auf die Harry geht?",
    answer_1: "Hogwarts",
    answer_2: "Durmstrang",
    answer_3: "Beauxbatons",
    answer_4: "Ilvermorny",
    right_answer: "answer_1",
  },
  {
    question: "Welcher Zauber öffnet Türen?",
    answer_1: "Stupefy",
    answer_2: "Alohomora",
    answer_3: "Imperio",
    answer_4: "Expelliarmus",
    right_answer: "answer_2",
  },
  {
    question: "Wie lautet der zweite Vorname von Harry Potter?",
    answer_1: "Arthur",
    answer_2: "James",
    answer_3: "Regulus",
    answer_4: "Sirius",
    right_answer: "answer_2",
  },
  {
    question: "Wie heißt der Direktor von Hogwarts im ersten Band?",
    answer_1: "Albus Dumbledore",
    answer_2: "Horace Slughorn",
    answer_3: "Minerva McGonagall",
    answer_4: "Severus Snape",
    right_answer: "answer_1",
  },
  {
    question: "Welches magische Objekt zeigt Harry seine tiefsten Wünsche?",
    answer_1: "Zeitumkehrer",
    answer_2: "Denkarium",
    answer_3: "Spiegel Nerhegeb",
    answer_4: "Marauders Karte",
    right_answer: "answer_3",
  },
  {
    question: "Welche Form hat Hermines Patronus?",
    answer_1: "Otter",
    answer_2: "Katze",
    answer_3: "Pferd",
    answer_4: "Fuchs",
    right_answer: "answer_1",
  },
  {
    question:
      "Wie heißt der dreiköpfige Hund, der den Stein der Weisen bewacht?",
    answer_1: "Fang",
    answer_2: "Fluffy",
    answer_3: "Norbert",
    answer_4: "Hedwig",
    right_answer: "answer_2",
  },
  {
    question: "Wie heißt der Zaubertrank, der absolute Wahrheit erzwingt?",
    answer_1: "Felix Felicis",
    answer_2: "Veritaserum",
    answer_3: "Amortentia",
    answer_4: "Essenz des Fuchses",
    right_answer: "answer_2",
  },
];

let currentQuestion = 0;
let currentQuestionMarker = 1;
let result = 0;
let clicked = false;
const endScreen = document.getElementById("endScreen");

function init() {
endScreen.style.display = "none";
  countQuestions();
  showQuestion();
}

function showQuestion() {
  let resultTag = (document.getElementById("yourResult").innerHTML =
    `Dein Punktestand lautet: ` + result);
  resetRightWrongMarker();

  let question = questions[currentQuestion];
  document.getElementById("questionText").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function nextQuestion() {
  if (currentQuestion === questions.length - 1) {
    const questionBody = document.getElementById("questionBody");

    questionBody.style.display = "none";

    endScreen.innerHTML = `
      <p>Das Spiel ist beendet.<br>
      Deine Punktzahl lautet: ${result} / ${questions.length}</p>
    `;

    endScreen.style.display = "flex";
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

  const selectedEl = document.getElementById(answerId);
  const correctEl = document.getElementById(rightAnswerId);

  if (answerId === rightAnswerId) {
    result++;
    selectedEl.parentNode.classList.add("bg-success");
  } else {
    selectedEl.parentNode.classList.add("bg-danger");
    correctEl.parentNode.classList.add("bg-success");
  }

  clicked = true;
  document.getElementById("next").classList.remove("disabled");
}

function resetRightWrongMarker() {
  document.querySelectorAll(".bg-success, .bg-danger").forEach((el) => {
    el.classList.remove("bg-success", "bg-danger");
  });
}
