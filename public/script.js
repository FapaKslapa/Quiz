const modalQuiz = new bootstrap.Modal("#modalQuiz");
const modalName = new bootstrap.Modal("#modalName");
const inviaUser = document.getElementById("inviaUser");
const username = document.getElementById("username");
let tempo = 0; // Inserisci il tempo in secondi
let countdown;
const modalQuizBody = document.getElementById("modalQuizBody");
const modalQuizTitle = document.getElementById("modalQuizTitle");
const template = `<li>
%DOMANDA
</li>`;
inviaUser.onclick = () => {
  if (username.value) {
    modalName.hide();
    getQuestion().then((data) => {
      modalQuiz.show();
      modalQuizTitle.innerHTML = data.title;
      modalQuizBody.innerHTML = renderQuestion(data.questions);
      tempo = data.timer;
      countdown = setInterval(() => {
        if (tempo > 10) {
          document.getElementById("tempoRimasto").innerHTML =
            tempo + '<span class="material-symbols-rounded"> schedule </span>';
          tempo--;
        } else if (tempo <= 10) {
          document.getElementById("tempoRimasto").innerHTML =
            tempo +
            '<span class="material-symbols-rounded"> schedule </span></p>';
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

function renderQuestion(question) {
  let html = ``;

  question.forEach((answer, index) => {
    html += `
    <li>
      <div class="row">
        <div class="col">%TITOLO</div>
        <div class="col">
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
  <label class="form-check-label" for="inlineRadio1"><button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
  Toggle width collapse
</button></label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
  <label class="form-check-label" for="inlineRadio2">2</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3">
  <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
</div>
        </div>
      </div>
      <div style="min-height: 120px;">
      <div class="collapse collapse-horizontal" id="collapseWidthExample">
        <div class="card card-body" style="width: 300px;">
          This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
        </div>
      </div>
    </div>
    </li>
    `;
  });
  return html;
}
