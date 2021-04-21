"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var question = document.getElementById('question');
var choices = Array.from(document.getElementsByClassName('choice-text'));
var progressText = document.getElementById('progressText');
var scoreText = document.getElementById('score');
var loader = document.getElementById('loader');
var game = document.getElementById('game');
var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = []; //CONSTANTS

var CORRECT_BONUS = 10;
var MAX_QUESTIONS = 0;

startGame = function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = _toConsumableArray(questions);
  MAX_QUESTIONS += availableQuestions.length;
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score); //go to the end page

    return window.location.assign('/end.html');
  }

  questionCounter++;
  progressText.innerText = "Question: ".concat(questionCounter, "/").concat(MAX_QUESTIONS);
  progressBarFull.style.width = "".concat(questionCounter / MAX_QUESTIONS * 100, "%");
  var questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  choices.forEach(function (choice) {
    var number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

incrementScore = function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
};

choices.forEach(function (choice) {
  choice.addEventListener('click', function (e) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset['number'];
    var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(function () {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});