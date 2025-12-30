const correctAnswers = {
  q1: "Paris",
  q2: "JavaScript",
  q3: "Hyper Text Markup Language",
  q4: "1995",
  q5: "Netscape"
};

// Restore selections
window.addEventListener("load", () => {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

  for (let q in progress) {
    const radio = document.querySelector(
      `input[name="${q}"][value="${progress[q]}"]`
    );
    if (radio) radio.checked = true;
  }

  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    document.getElementById("score").textContent =
      `Your score is ${savedScore} out of 5.`;
  }
});

// Save progress
document.querySelectorAll('input[type="radio"]').forEach(radio => {
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

  for (let q in correctAnswers) {
    if (progress[q] === correctAnswers[q]) score++;
  }

  document.getElementById("score").textContent =
    `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
});
