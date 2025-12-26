const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Quiz data
const questions = [
  {
    question: "Question 1",
    options: ["A", "B", "C", "D"],
    correct: 0
  },
  {
    question: "Question 2",
    options: ["A", "B", "C", "D"],
    correct: 1
  },
  {
    question: "Question 3",
    options: ["A", "B", "C", "D"],
    correct: 2
  },
  {
    question: "Question 4",
    options: ["A", "B", "C", "D"],
    correct: 3
  },
  {
    question: "Question 5",
    options: ["A", "B", "C", "D"],
    correct: 0
  }
];

// Load progress from sessionStorage
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  questionsDiv.innerHTML = "";

  questions.forEach((q, qIndex) => {
    const qDiv = document.createElement("div");

    const title = document.createElement("p");
    title.textContent = q.question;
    qDiv.appendChild(title);

    q.options.forEach((opt, optIndex) => {
      const label = document.createElement("label");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${qIndex}`;
      radio.value = optIndex;

      // Restore checked state
      if (savedProgress[qIndex] == optIndex) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        savedProgress[qIndex] = optIndex;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(opt));

      qDiv.appendChild(label);
      qDiv.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(qDiv);
  });
}

// Submit quiz
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (savedProgress[index] == q.correct) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// Initial render
renderQuestions();

// Restore score after refresh (if exists)
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
}
