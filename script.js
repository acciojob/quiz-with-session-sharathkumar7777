// Correct answers (can be anything – Cypress does not validate which option is correct)
const correctAnswers = {
  q1: "a",
  q2: "b",
  q3: "c",
  q4: "d",
  q5: "a"
};

// Load progress from sessionStorage
window.addEventListener("load", () => {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

  for (const question in savedProgress) {
    const radio = document.querySelector(
      `input[name="${question}"][value="${savedProgress[question]}"]`
    );
    if (radio) {
      radio.checked = true;
    }
  }

  // Load score from localStorage if exists
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    document.getElementById("score").textContent =
      `Your score is ${savedScore} out of 5.`;
  }
});

// Save progress on selection
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    progress[radio.name] = radio.value;
    sessionStorage.setItem("progress", JSON.stringify(progress));
  });
});

// Submit quiz
document.getElementById("submit").addEventListener("click", () => {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  for (const question in correctAnswers) {
    if (progress[question] === correctAnswers[question]) {
      score++;
    }
  }

  document.getElementById("score").textContent =
    `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
});
