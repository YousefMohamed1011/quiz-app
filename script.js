const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Lisbon", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Leo Tolstoy", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "O2", correct: false },
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "NaCl", correct: false },
    ],
  },
  {
    question: "Which country hosted the 2016 Summer Olympics?",
    answers: [
      { text: "China", correct: false },
      { text: "Brazil", correct: true },
      { text: "Japan", correct: false },
      { text: "Germany", correct: false },
    ],
  },
];

const getqus = document.getElementById("ques");
const ans = document.getElementById("ans");
const ansnext = document.getElementById("next-btn");

let currnt = 0;
let score = 0;

function start() {
  currnt = 0;
  score = 0;
  ansnext.innerHTML = "Next";
  show();
}

function show() {
  reset();
  let currntq = questions[currnt];
  let qusetionv = currnt + 1;

  getqus.innerHTML = qusetionv + ". " + currntq.question;

  currntq.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    ans.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", select);
  });
}

function reset() {
  ansnext.style.display = "none";
  while (ans.firstChild) {
    ans.removeChild(ans.firstChild);
  }
}

function select(e) {
  const selected = e.target;
  const isCorrect = selected.dataset.correct === "true";
  if (isCorrect) {
    selected.classList.add("correct");
    score++;
  } else {
    selected.classList.add("incorrect");
  }
  Array.from(ans.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  ansnext.style.display = "block";
}

function showscore() {
  reset();
  getqus.innerHTML = `You Scored ${score} Out Of ${questions.length}`;
  ansnext.innerHTML = "Try Again";
  ansnext.style.display = "block";
}

function handleNextButton() {
  currnt++;
  if (currnt < questions.length) {
    show();
  } else {
    showscore();
  }
}

ansnext.addEventListener("click", () => {
  if (currnt < questions.length) {
    handleNextButton();
  } else {
    start();
  }
});

start();
