const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: 0
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperTool Markup Language",
      "None of the above"
    ],
    answer: 0
  }
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// ---------------- RENDER QUESTIONS ----------------
function renderQuestions() {
  questionsDiv.innerHTML = "";

  quizData.forEach((q, qIndex) => {
    const qDiv = document.createElement("div");

    const qTitle = document.createElement("p");
    qTitle.textContent = q.question;
    qDiv.appendChild(qTitle);

    q.options.forEach((option, oIndex) => {
      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${qIndex}`;
      input.value = oIndex;

      if (progress[qIndex] == oIndex) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        progress[qIndex] = oIndex;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      qDiv.appendChild(label);
      qDiv.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(qDiv);
  });
}

// ---------------- SUBMIT QUIZ ----------------
submitBtn.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    if (progress[index] == q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// ---------------- LOAD STORED SCORE ----------------
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
}

renderQuestions();
