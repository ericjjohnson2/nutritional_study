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
    incorrectMessage: "Incorrect. The McDonald's Double Bacon Smokehouse Burger has 1,130 calories!",
    fact: "Fast Food Fact: The average fast food meal contains 1,200 calories."
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
    correctMessage: "Correct! The Burger King American Brewhouse King has the highest with 805mg of cholesterol.",
    incorrectMessage: "Incorrect. The Burger King American Brewhouse King has the highest with 805mg of cholesterol.",
    fact: "Fast Food Fact: The Recommended Daily Amount of cholesterol is 300mg."
  },
  {
    question: "Which Fast Food Item has the most protein?",
    options: [
      "Subway Footlong Corned Beef Reuben",
      "Chick Fil-A 30 Piece Chicken Nuggets",
      "Arbys Triple Decker Sandwich",
      "McDonalds 20 piece Buttermilk Crispy Chicken Tenders"
  ],
    answer: "McDonalds 20 piece Buttermilk Crispy Chicken Tenders",
    correctMessage: "Correct! McDonalds 20 piece Buttermilk Crispy Chicken Tenders has 186 grams of protein",
    incorrectMessage: "Incorrect. McDonalds 20 piece Buttermilk Crispy Chicken Tenders has 186 grams of protein.",
    fact: "Fast Food Fact: In Minnesota there are 218 McDondald's, 146 Burger Kings and 88 Taco Bells"
},
{
  question: "Which Subway Sandwich contains the largest amount of trans/saturated fats?",
  options: [
      "Footlong Chicken & Bacon Ranch Melt",
      "Footlong Steak & Cheese",
      "Footlong Cold Cut Combo",
      "Footlong Chicken Pizziola Melt"
],
  answer: "Footlong Chicken & Bacon Ranch Melt",
  correctMessage: "Correct! The Footlong Chicken & Bacon Ranch Melt has 20g Sat Fat and 2g Trans Fat",
  incorrectMessage: "Incorrect. The Footlong Chicken & Bacon Ranch Melt has 20g Sat Fat and 2g Trans Fat",
  fact: "Fast Food Fact: In a 2,000 calorie daily diet, the Recommended Daily Amount of Saturated Fats is 15g, and less than 2g of Trans Fats"
},
{
  question: "Whose chicken sandwich has the least amount of sodium?",
  options: [
      "Burger King Grilled Chicken Sandwich",
      "Dairy Queen Grilled Chicken Sandwich",
      "Sonic Grilled Chicken Sandwich",
      "Chick Fil-A Chargrilled Chicken Sandwich"
],
  answer: "Chick Fil-A Chargrilled Chicken Sandwich",
  correctMessage: "Correct! The Chick Fil-A Chargrilled Chicken Sandwich has 820mg of sodium",
  incorrectMessage: "Incorrect. The The Chick Fil-A Chargrilled Chicken Sandwich has 820mg of sodium",
  fact: "Fast Food Fact: The Recommended Daily Amount of sodium is 2,300mg - about a teaspoon of salt"
},
{
  question: "Which Taco Bell menu item has the most calories from fat?",
  options: [
      "Smothered Steak Burrito",
      "XXL Grilled Stuft Chicken Burrito",
      "Double Chalupa",
      "Cheesy Gordita Crunch"
],
  answer: "XXL Grilled Stuft Chicken Burrito",
  correctMessage: "Correct! The XXL Grilled Stuft Chicken Burrito has 320 calories from fat",
  incorrectMessage: "Incorrect. The XXL Grilled Stuft Chicken Burrito has 320 calories from fat",
  fact: "Fast Food Fact: The Institute of Medicine and the American Heart Association recommend a total fat intake of 25-35 percent of calories."
},  
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const messageContainer = document.getElementById("answer-message");
const factContainer = document.getElementById("fact-message");

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
 // Display the fact
 factContainer.innerText = question.fact || ""; // Display the fact if available, otherwise display an empty string
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const answer = quizData[currentQuestion].answer;

  // Check if the selected answer is correct
  if (selectedButton.innerText === answer) {
    score++;
    messageContainer.innerHTML = `<span style="font-size: 18px; color: #4CAF50; text-align: center;">${quizData[currentQuestion].correctMessage}</span>`;
  } else {
    messageContainer.innerHTML = `<span style="font-size: 16px; color: #FF5733; text-align: center;">${quizData[currentQuestion].incorrectMessage}</span>`;
  }

  // Disable further clicks on options after an answer is selected
  document.querySelectorAll("#options button").forEach(button => {
    button.removeEventListener("click", selectAnswer);
  });

  // Show the message for 3 seconds before moving to the next question
  setTimeout(() => {
    messageContainer.innerText = "";
    selectedButton.style.backgroundColor = ""; // Reset background color

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 4000);
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







