const modalQuiz = new bootstrap.Modal("#modalQuiz");
const modalName = new bootstrap.Modal("#modalName");
const inviaUser = document.getElementById("inviaUser");
const username = document.getElementById("username");

let tempo = 60; // Inserisci il tempo in secondi
let countdown;
inviaUser.onclick = () => {
  if (username.value) {
    modalName.hide();
    getQuestion().then((data) => {
      modalQuiz.show();
      tempo = data.timer;
      countdown = setInterval(() => {
        if (tempo > 10) {
          document.getElementById("tempoRimasto").innerHTML =
            "<p>" + tempo + "</p>";
          tempo--;
        } else if (tempo <= 10) {
          '<p class="text-danger">' + tempo + "</p>";
          tempo--;
        }
        if (tempo < 0) {
          clearInterval(countdown);
          document.getElementById("modalQuizTitle").innerHTML =
            "Tempo esaurito!";
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

const renderQuestion = (array) => {};
