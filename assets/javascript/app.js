var panel = $('#quiz-area');
var countStartNumber = 30;

$(document).on('click', '#start-over', function (e) {
  game.reset();
});

$(document).on('click', '.answer-button', function (e) {
  game.clicked(e);
});

$(document).on('click', '#start', function (e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

var questions = [{
  question: "Who is the MLB all-time leader in career home runs with 762?",
  answers: ["Ken Griffey Jr.", "Barry Bonds", "Hank Aaron", "Babe Ruth"],
  correctAnswer: "Barry Bonds",
  image: "assets/images/bonds.gif",
},
{
  question: "Who is the recipient of the highest AAV (annual average value) contract, which tops out at $33.7 million per year for 8 years?",
  answers: ["Bryce Harper", "Giancarlo Stanton", "Nolan Arenado", "Manny Machado"],
  correctAnswer: "Nolan Arenado",
  image: "assets/images/arenado.gif",
},
{
  question: "Which team has won the most championships since 2000?",
  answers: ["San Francisco Giants", "New York Yankees", "Chicago Cubs", "Boston Red Sox"],
  correctAnswer: "Boston Red Sox",
  image: "assets/images/redsox.gif",
},
{
  question: "Also known as the Sandman, which closer has the most saves in MLB history?",
  answers: ["Trevor Hoffman", "Brian Wilson", "Craig Kimbrel", "Mariano Rivera"],
  correctAnswer: "Mariano Rivera",
  image: "assets/images/mo.gif",

},
{
  question: "Who is the all-time leader in stolen bases, also known as The Man of Steal?",
  answers: ["Billy Hamilton", "Dee Gordon", "Ricky Henderson", "Ichiro Suzuki"],
  correctAnswer: "Ricky Henderson", 
  image: "assets/images/ricky.gif",
}

];

var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,
  countdown: function () {
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0) {
      console.log('TIMES UP!');
      game.timeUp();
    }
  },
  loadQuestion: function () {
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
    }
  },
  nextQuestion: function () {
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function () {
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Time is up!</h2>');
    panel.append('<h3>The Correct Answer is: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },
  clicked: function (e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function () {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Incorrect!</h2>');
    panel.append('<h3>The Correct Answer is: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },
  answeredCorrectly: function () {
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },
  results: function () {
    clearInterval(timer);
    panel.html('<h2>How you did on this quiz:</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  reset: function () {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};



