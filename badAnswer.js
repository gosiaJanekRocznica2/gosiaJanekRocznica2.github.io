
checkAccess();
videoYT = document.getElementById("videoYT")
setSite();

function checkAccess(){
  if(localStorage.getItem('AnswerCounter')==null){
    location.href = "/rules.html"
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

async function getVideo(){
  result = await fetch("https://gosiajanekrocznica2.herokuapp.com/video/getFailure", {
      method: 'GET',
      headers: ({
          "Content-Type": "application/json; charset=UTF-8"
      })
  })
  result = result.json()
  return result;
}