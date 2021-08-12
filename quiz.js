checkAccess();
submitButton = document.getElementById('submitButton');
question = document.getElementById('question')
answerA = document.getElementById('answerA')
answerB = document.getElementById('answerB')
answerC = document.getElementById('answerC')
anserD = document.getElementById('answerD')
numberQuestion = document.getElementById('numberQuestion')

loadSite();

function checkAccess(){
  if(localStorage.getItem("AnswerCounter")==null){
    location.href="/rules.html"
  }
}

//Next question//
function nextQuestion(){
  answerCounter = Number(localStorage.getItem('AnswerCounter'))
  if(answerCounter==9)
  {
    location.href="/getPin.html"
  }else{
    localStorage.setItem('AnswerCounter',answerCounter+1)
    loadSite();
  }
}

//LOADED SITE//
async function loadSite(){
  questionID = localStorage.getItem(prepareNameVariableInLocalStorage());
  questionQuiz = await getQuestion(questionID);
  setElementOnSite(questionQuiz);
}

function setElementOnSite(questionQuiz){
  console.log(questionQuiz);
  question.innerHTML = questionQuiz.question;
  answerA.innerHTML = questionQuiz.answerA;
  answerB.innerHTML = questionQuiz.answerB;
  answerC.innerHTML = questionQuiz.answerC;
  answerD.innerHTML = questionQuiz.answerD;
  
  numberQuestion.innerHTML = "Pytanie #"+(Number(localStorage.getItem('AnswerCounter'))+1);
}

async function getQuestion(id){
  result = await fetch("https://gosiajanekrocznica2.herokuapp.com/quiz?id="+id, {
      method: 'GET',
      headers: ({
          "Content-Type": "application/json; charset=UTF-8"
      })
  })
  result = result.json()
  return result;
}

// GET USER CHOICE//
function findUserChoice(answers){
  answerUser = 0;

  for(var i=0; i<4; i++){
    if(answers[i].checked==true){
      answerUser = i + 1;
      break;
    }
  }

  return answerUser;
}

function prepareNameVariableInLocalStorage(){
  var answerCounter = localStorage.getItem('AnswerCounter')
  return "answerID"+answerCounter;
}

submitButton.addEventListener('click', async e=>{
  e.preventDefault();
  answers = document.getElementsByName('answer');
  answerUser = findUserChoice(answers);
  questionID = localStorage.getItem(prepareNameVariableInLocalStorage());
  isCorrectAnswer = await checkAnswer(questionID, answerUser);
  if(isCorrectAnswer){
    nextQuestion();
  }else{
    location.href="/badAnswer.html";
  }
})

async function checkAnswer(id, answer) {
  result = await fetch("https://gosiajanekrocznica2.herokuapp.com/quiz/checkAnswer?id="+id+"&answer="+answer, {
      method: 'GET',
      headers: ({
          "Content-Type": "application/json; charset=UTF-8"
      })
  })
  result = result.json()
  return result;
}