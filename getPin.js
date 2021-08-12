checkAccess()
videoYT = document.getElementById("videoYT")
getPinButton = document.getElementById("getPinButton")
setSite();

function checkAccess(){
  if(localStorage.getItem("AnswerCounter")!=9){
    removeItems();
    location.href="/rules.html"
  }else{
    removeItems();
  }
}

function removeItems(){
  for(var i=0; i<10; i++){
    localStorage.removeItem('answerID'+i);
  }
  localStorage.removeItem('AnswerCounter')
}

async function setSite(){
  resultVideo = await getVideo()
  videoYT.src = resultVideo.url;
}

getPinButton.addEventListener('click', async e=>{
  pin = await getPin()
  getPinButton.innerHTML = pin
})
async function getVideo(){
  result = await fetch("https://gosiajanekrocznica2.herokuapp.com/video/getSuccess", {
      method: 'GET',
      headers: ({
          "Content-Type": "application/json; charset=UTF-8"
      })
  })
  result = result.json()
  return result;
}

async function getPin(){
  result = await fetch("https://gosiajanekrocznica2.herokuapp.com/quiz/getPIN", {
      method: 'GET',
      headers: ({
          "Content-Type": "application/json; charset=UTF-8"
      })
  })
  result = result.json()
  return result;
}