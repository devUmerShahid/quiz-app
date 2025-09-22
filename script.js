//Here the questiond and answers arw stored in array of objects
const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "C", "Java", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Language",
      "Hyper Text Markup Leveler"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<css>", "<script>", "<link>"],
    answer: "<style>"
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["color", "bgcolor", "background-color", "background"],
    answer: "background-color"
  },
  
];

// intialize the question and score with 0
let currentQuestion = 0;
let score = 0;

//actually these variables get the elements(cards) from the html file using id.
const startScreen = document.getElementById("start-screen"); 
const quizScreen = document.getElementById("quiz-screen");   
const resultScreen = document.getElementById("result-screen"); 

const questionText = document.getElementById("question"); 
const optionA = document.getElementById("option_a"); 
const optionB = document.getElementById("option_b"); 
const optionC = document.getElementById("option_c"); 
const optionD = document.getElementById("option_d"); 

const answers = document.querySelectorAll(".answer"); // all radio inputs

const startBtn = document.getElementById("start-btn"); // start button
const nextBtn = document.getElementById("next-btn");   // next button
const restartBtn = document.getElementById("restart-btn"); // restart button

const scoreText = document.getElementById("score-text"); // score display

// when we click start button
startBtn.addEventListener("click", function() {
  startScreen.classList.remove("active"); // hide start screen
  quizScreen.classList.add("active");     // show quiz screen
  showQuestion(); // load first question
});

// function to show a question
function showQuestion() {
  // make sure all radios are unchecked
  answers.forEach(ans => ans.checked = false);

  // get current question from array
  let q = questions[currentQuestion];

  // put question text on screen
  questionText.textContent = q.question;

  // put options text on labels
  optionA.textContent = q.options[0];
  optionB.textContent = q.options[1];
  optionC.textContent = q.options[2];
  optionD.textContent = q.options[3];
}

// when we click next button
nextBtn.addEventListener("click", function() {
  // variable to hold the selected answer
  let selected = null;

  // check which radio is selected
  answers.forEach(ans => {
    if (ans.checked) {
      // get the text of the label next to it
      selected = ans.nextElementSibling.textContent;
    }
  });

  // if no optipon  is selected, it show alert
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  // check if answer is correct
  if (selected === questions[currentQuestion].answer) {
    score++; // add 1 to score
  }

  // go to next question
  currentQuestion++;

  // if more questions left, show them
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz(); // else finish quiz
  }
});

// function to show result screen
function endQuiz() {
  quizScreen.classList.remove("active"); // hide quiz
  resultScreen.classList.add("active");  // show result
  scoreText.textContent = "You scored " + score + " out of " + questions.length;
}

// when we click restart button
restartBtn.addEventListener("click", function() {
  currentQuestion = 0; // reset to first question
  score = 0;           // reset score
  resultScreen.classList.remove("active"); // hide result
  quizScreen.classList.add("active");      // show quiz again
  showQuestion(); // show first question again
});