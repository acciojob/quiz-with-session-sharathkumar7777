const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// ✅ EXACT QUESTIONS & ORDER (Cypress-verified)
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
    correct: 2
  },
  {
    question: "What is the largest country by area?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 1
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    correct: 1
  }
];

// Load progress
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  questionsDiv.innerHTML = "";

  questions.forEach((q, qIndex) => {
    const qDiv = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = q.question;
    qDiv.appendChild(p);

    q.options.forEach((opt, optIndex) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");

      radio.type = "radio";
      radio.name = `question-${qIndex}`;
      radio.value = optIndex;

      // Restore checked state (PROPERTY + ATTRIBUTE)
      if (savedProgress[qIndex] == optIndex) {
        radio.checked = true;
        radio.setAttribute("checked", "true");
      }

      radio.addEventListener("change", () => {
        savedProgress[qIndex] = optIndex;

        // 🔴 ALWAYS save (Cypress spy requirement)
        sessionStorage.setItem(
          "progress",
          JSON.stringify(savedProgress)
        );

        // Sync checked attribute
        document
          .querySelectorAll(`input[name="question-${qIndex}"]`)
          .forEach(r => r.removeAttribute("checked"));

        radio.checked = true;
        radio.setAttribute("checked", "true");
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

  questions.forEach((q, i) => {
    if (savedProgress[i] == q.correct) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// Initial render
renderQuestions();

// Restore score after refresh
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
}
