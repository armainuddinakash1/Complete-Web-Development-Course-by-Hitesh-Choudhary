// targeting dom elements
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices-list");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const startBtn = document.getElementById("start-btn");

// quizzes array
const quizzes = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
    marks: 10,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Vinus", "Jupiter", "Saturn"],
    answer: "Mars",
    marks: 10,
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: [
      "Charls Dickens",
      "Jane Austen",
      "William Shakespeare",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
    marks: 10,
  },
];

// current quiz Index
let quizIndex = 0;

// check for whether the answer is clicked or not
let isAnswered = false;

// storing score
let score = 0;

// marks array
let marks = 0;

const totalMarks = totalMarksFunc();

// render quiz function
function renderQuiz() {
  if (quizIndex < quizzes.length) {
    const quiz = quizzes[quizIndex];
    questionContainer.classList.remove("hidden");
    questionText.textContent = quiz.question;
    choicesList.textContent = "";
    quiz.options.forEach((option) => {
      const newLi = document.createElement("li");
      newLi.textContent = option;
      choicesList.appendChild(newLi);
    });
  } else {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.innerHTML = `      
      <p>Correct answer(s) : ${score} out of ${quizzes.length}</p>
      <p>Marks : ${marks} out of ${totalMarks}</p>
    `;
  }
}

function totalMarksFunc() {
  let sum = 0;
  quizzes.forEach((quiz) => {
    sum += quiz.marks;
  });
  return sum;
}

// starting quiz on start btn click
startBtn.addEventListener("click", () => {
  renderQuiz();
  startBtn.classList.add("hidden");
});

// handling option click
choicesList.addEventListener("click", (e) => {
  const selectedOption = e.target.closest("li");
  if (selectedOption && !isAnswered) {
    nextBtn.classList.remove("hidden");
    selectedOption.classList.add("option-clicked");
    if (quizzes[quizIndex].answer === selectedOption.textContent) {
      score++;
      marks += quizzes[quizIndex].marks;
      // console.log(quizzes[quizIndex].marks)
    }
    quizIndex++;
    isAnswered = true;
  }
});

// handling next button click
nextBtn.addEventListener("click", () => {
  isAnswered = false;
  renderQuiz();
  nextBtn.classList.add("hidden");
});

// restarting quiz on restart btn
restartBtn.addEventListener("click", () => {
  quizIndex = 0;
  score = 0;
  isAnswered = false;
  marks = 0;
  choicesList.textContent = "";
  renderQuiz();
  questionContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
});
