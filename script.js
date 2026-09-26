const questions = [
  {
    question: "ماذا يعني اختصار HTML ؟",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "High Text Making Language",
      "Hyper Text Making Language"
    ],
    correct: 1
  },
  {
    question: "أي وسم (tag) بيستخدم لإضافة صورة بصفحة HTML؟",
    options: ["<image>", "<pic>", "<img>", "<src>"],
    correct: 2
  },
  {
    question: "ماذا يعني اختصار CSS ؟",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    correct: 0
  },
  {
    question:"يستخدم لتغيير لون الخلفية في CSS  أي خاصية؟",
    options: ["color", "background-color", "bg-color", "text-color"],
    correct: 1
  },
  {
    question: "كيف منعمل selector لعنصر عندو class اسمه box بالـCSS؟",
    options: ["#box", ".box", "*box", "box{}"],
    correct: 1
  },
  {
    question: "ماذا يعني اختصار JS ؟",
    options: ["JustScript", "JavaScript", "JavaSyntax", "JScript"],
    correct: 1
  },
  {
    question: "أي دالة (function) يستخدم لطباعة رسالة بـconsole المتصفح؟",
    options: ["console.print()", "console.write()", "console.log()", "print.console()"],
    correct: 2
  },
  {
    question: "كيف نعرّف متغير (variable) ثابت مايتغير بالـJavaScript؟",
    options: ["var", "let", "const", "static"],
    correct: 2
  },
  {
    question: "أي وسم يستخدم لربط ملف CSS خارجي بصفحة HTML؟",
    options: ["<style>", "<css>", "<link>", "<script>"],
    correct: 2
  },
  {
    question: " ماهي القيمة التي تعيدها الدالة document.getElementById()؟",
    options: [
      "لائحة عناصر (array)",
      "عنصر واحد من الصفحة",
      "نص (string)",
      "رقم (number)"
    ],
    correct: 1
  }
];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval = null;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");


const questionCountEl = document.getElementById("question-count");
const timerEl = document.getElementById("timer");
const progressBarEl = document.getElementById("progress-bar");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");


const statusBadgeEl = document.getElementById("status-badge");
const resultTitleEl = document.getElementById("result-title");
const scoreTextEl = document.getElementById("score-text");


function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showScreen(quizScreen);
  loadQuestion();
}
function loadQuestion() {
  resetTimer();

  const currentQuestion = questions[currentQuestionIndex];


  questionCountEl.textContent =
    "السؤال " + (currentQuestionIndex + 1) + " / " + questions.length;

  // تحديث شريط التقدم
  const progressPercent = (currentQuestionIndex / questions.length) * 100;
  progressBarEl.style.width = progressPercent + "%";

  questionTextEl.textContent = currentQuestion.question;

  
  optionsContainerEl.innerHTML = "";
  const letters = ["A", "B", "C", "D"];

currentQuestion.options.forEach(function (optionText, index) {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");

    const badge = document.createElement("span");
    badge.classList.add("badge");
    badge.textContent = letters[index];

    btn.appendChild(badge);
    btn.appendChild(document.createTextNode(" " + optionText));

    btn.addEventListener("click", function () {
      selectAnswer(index, btn);
    });

    optionsContainerEl.appendChild(btn);
  });

  startTimer(); 
 }
function startTimer() {
  timeLeft = 15;
  timerEl.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      selectAnswer(-1, null); 
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
}
function selectAnswer(selectedIndex, btnElement) {
  resetTimer();

  const currentQuestion = questions[currentQuestionIndex];
  const allButtons = document.querySelectorAll(".option-btn");

 
  allButtons.forEach(btn => btn.style.pointerEvents = "none");

  
  allButtons[currentQuestion.correct].classList.add("correct");


  if (selectedIndex !== currentQuestion.correct && btnElement) {
    btnElement.classList.add("wrong");
  }

  
  if (selectedIndex === currentQuestion.correct) {
    score++;
  }


  setTimeout(function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function showResult() {
  showScreen(resultScreen);

  const passed = score >= questions.length / 2;

  if (passed) {
    statusBadgeEl.textContent = "GREAT!";
    resultTitleEl.textContent = "YOU WIN!";
  } else {
    statusBadgeEl.textContent = "OH NO!";
    resultTitleEl.textContent = "YOU LOST!";
  }

 scoreTextEl.textContent =
    "أجبت على " + score + " من " + questions.length + " بشكل صحيح";
}

function restartQuiz() {
  startQuiz();
}