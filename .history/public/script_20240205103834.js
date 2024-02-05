const modalQuiz = new bootstrap.Modal("#modalQuiz");
const modalName = new bootstrap.Modal("#modalName");
const inviaUser = document.getElementById("inviaUser");
const username = document.getElementById("username");
inviaUser.onclick = () => {
  if (username.value) {
    modalName.hide();
    getQuestion().then((data) => {
      modalQuiz.show();
      countdown = setInterval(() => {
        document.getElementById('modalQuizTitle').innerText = tempo;
        tempo--;
    
        if (tempo < 0) {
          clearInterval(countdown);
          document.getElementById('modalQuizTitle').innerText = 'Tempo esaurito!';
        }
      }, 1000);
    });
  }
};

const getQuestion = () => {
  return new Promise((resolve, reject) => {
    fetch("/question")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        resolve(json);
      });
  });
};

let tempo = 60; // Inserisci il tempo in secondi

const countdown = setInterval(() => {
  document.getElementById('modalQuizTitle').innerText = tempo;
  tempo--;

  if (tempo < 0) {
    clearInterval(countdown);
    document.getElementById('modalQuizTitle').innerText = 'Tempo esaurito!';
  }
}, 1000);