tryConnectionButton = document.getElementById('tryConnection');

tryConnectionButton.addEventListener('click', async e=>{
  e.preventDefault();
  await tryConnection();
})

async function tryConnection(){
  await getTimeToStart()
  location.href="/rules.html"
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