// ---------------- QUESTIONS DATA ----------------
const quizData = [
  {
    question: "Question 1",
    options: ["A", "B", "C", "D"],
    answer: 0
  },
  {
    question: "Question 2",
    options: ["A", "B", "C", "D"],
    answer: 1
  },
  {
    question: "Question 3",
    options: ["A", "B", "C", "D"],
    answer: 2
  },
  {
    question: "Question 4",
    options: ["A", "B", "C", "D"],
    answer: 3
  },
  {
    question: "Question 5",
    options: ["A", "B", "C", "D"],
    answer: 0
  }
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// ---------------- LOAD SAVED PROGRESS ----------------
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

      // Restore checked state
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

// Initial render
renderQuestions();
