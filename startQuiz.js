var startQuizButton = document.getElementById('startQuiz');

function saveDataToLocalStorage(dataToSave){
  for(var i=0; i<10; i++){
    localStorage.setItem('answerID'+i,dataToSave[i]);
  }
  localStorage.setItem('AnswerCounter',0);
}

startQuizButton.addEventListener('click', async e=>{
  e.preventDefault();
  questionsID = await getQuestionsID();
  if(questionsID.length==10){
    saveDataToLocalStorage(questionsID);
    location.href="/quiz.html";
  }else{
    location.href="/cantStartQuiz.html"
  }
})


async function getQuestionsID() {
  result = await fetch("http://localhost:8080/quiz/getQuestionsId", {
      method: 'GET',
      headers: ({
          "Content-Type": "application/json; charset=UTF-8"
      })
  })
  result = result.json()
  return result;
}