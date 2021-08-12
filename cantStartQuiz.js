var hours;
var minutes;
var seconds;
var secondsToStart;

secondsHTML = document.getElementById("seconds")
minutesHTML = document.getElementById("minutes")
hoursHTML = document.getElementById("hours")
startQuizButton = document.getElementById("startQuiz")

setElementOnSite()

startQuizButton.addEventListener('click', e=>{
  location.href="/startQuiz.html"
})

async function setElementOnSite(){
  secondsToStart = await getTimeToStart();
  startClock();
}

function startClock(){
  calculateHoursMinutesAndSeconds(secondsToStart)

  hoursHTML.innerHTML = (hours<10)?('0'+hours):hours;
  minutesHTML.innerHTML = (minutes<10)?('0'+minutes):minutes;
  secondsHTML.innerHTML = (seconds<10)?('0'+seconds):seconds;
  secondsToStart--;

  if(secondsToStart>=0){
    setTimeout("startClock()", 1000);
  }else{
    startQuizButton.disabled=false;
  }
}

function calculateHoursMinutesAndSeconds(secondsToStart){
  seconds = secondsToStart%60;
  minutes = ((secondsToStart-seconds)/60)%60;
  hours = ((secondsToStart-seconds-minutes*60)/3600)%24;
}

async function getTimeToStart(){
  result = await fetch("https://gosiajanekrocznica2.herokuapp.com/quiz/getTimeToStart", {
      method: 'GET',
      headers: ({
          "Content-Type": "application/json; charset=UTF-8"
      })
  })
  result = result.json()
  return result;
}