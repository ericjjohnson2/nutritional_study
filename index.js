const quizData = [
  {
    question: "Which Fast Food Item has the most Calories?",
    options: [
      "Dairy Queen 1/4 Bacon Cheese GrillBurger",
      "McDonalds Double Bacon Smokehouse Burger",
      "Burger King Double Bacon Cheeseburger",
      "Sonic Super Sonic Double Cheeseburger"
    ],
    answer: "McDonalds Double Bacon Smokehouse Burger",
    correctMessage: "Correct! The McDonald's Double Bacon Smokehouse Burger has 1,130 calories!",
    incorrectMessage: "Incorrect. The McDonald's Double Bacon Smokehouse Burger has 1,130 calories!"
  },
  {
    question: "Which Fast Food Item has the highest cholesterol?",
    options: [
      "Burger King American Brewhouse King",
      "Chick Fil-A 30 Piece Chicken Nuggets",
      "McDonalds 40 Piece Chicken McNuggets",
      "Dairy Queen Large Cheese Curds"
    ],
    answer: "Burger King American Brewhouse King",
    correctMessage: "Correct! The Burger King American Brewhouse King has the highest.",
    incorrectMessage: "Incorrect. The Burger King American Brewhouse King has the highest."
  }
  // Add more questions here...
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const messageContainer = document.getElementById("answer-message"); // Added message container

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const question = quizData[currentQuestion];
  questionElement.innerText = question.question;

  optionsElement.innerHTML = "";
  question.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    optionsElement.appendChild(button);
    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const answer = quizData[currentQuestion].answer;

  // Check if the selected answer is correct
  if (selectedButton.innerText === answer) {
    score++;
    messageContainer.innerText = quizData[currentQuestion].correctMessage;
    messageContainer.style.color = "#4CAF50"; // Green for correct
  } else {
    messageContainer.innerText = quizData[currentQuestion].incorrectMessage;
    messageContainer.style.color = "#FF5733"; // Red for incorrect
  }

  // Disable further clicks on options after an answer is selected
  document.querySelectorAll("#options button").forEach(button => {
    button.removeEventListener("click", selectAnswer);
  });

  // Show the message for 2 seconds before moving to the next question
  setTimeout(() => {
    messageContainer.innerText = "";
    selectedButton.style.backgroundColor = ""; // Reset background color

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 2000);
}

function showResult() {
  const resultContainer = document.getElementById("result-message");
  const percentage = (score / quizData.length) * 100;

  let message = "";
  if (percentage === 100) {
    message = "Perfect! You really know your fast food!";
  } else if (percentage >= 70) {
    message = "Well done! You did a great job!";
  } else {
    message = "You get a participation ribbon!";
  }

  resultContainer.innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your score: ${score}/${quizData.length}</p>
    <p>${message}</p>
  `;
}

showQuestion();







