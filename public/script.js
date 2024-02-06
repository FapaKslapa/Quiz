const modalQuiz = new bootstrap.Modal("#modalQuiz");
const modalName = new bootstrap.Modal("#modalName");
const inviaUser = document.getElementById("inviaUser");
const username = document.getElementById("username");
let tempo = 0;
let countdown;
let id = [];
const modalQuizBody = document.getElementById("modalQuizBody");
const modalQuizTitle = document.getElementById("modalQuizTitle");
const tempoRimasto = document.getElementById("tempoRimasto");
const inviaModulo = document.getElementById("inviaModulo");
const classifica = document.getElementById("classifica");
const template = `
    <li class="list-group-item">
      <div class="row">
        <div class="col fw-bold">%TITOLO</div>
        <div class="col">
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="Domanda%IDOMANDA" id="inlineRadio1" value="1">
  <label class="form-check-label" for="inlineRadio1"><button class="btn  btn-outline-light btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1-%ID" aria-expanded="true">
  Risposta 1
</button></label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="Domanda%IDOMANDA" id="inlineRadio2" value="2">
  <label class="form-check-label" for="inlineRadio2">
  <button class="btn  btn-outline-light btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2-%ID" aria-expanded="true">
  Risposta 2
</button></label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="Domanda%IDOMANDA" id="inlineRadio3" value="3">
  <label class="form-check-label" for="inlineRadio3"><button class="btn  btn-outline-light btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3-%ID" aria-expanded="true">
  Risposta 3
</button></label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="Domanda%IDOMANDA" id="inlineRadio4" value="4">
  <label class="form-check-label" for="inlineRadio4"><button class="btn  btn-outline-light btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4-%ID" aria-expanded="true">
  Risposta 4
</button></label>
</div>
        </div>
      </div>
      <div class="row mt-5">
      <div class="col">
      <div style="min-height: 12rem;">
      <div class="collapse show collapse-horizontal" id="collapse1-%ID">
        <div class="card card-body" style="width: 12rem;">
          %RISPOSTA1
        </div>
      </div>
    </div>
    </div>
    <div class="col">
    <div style="min-height: 12rem;">
      <div class="collapse show collapse-horizontal" id="collapse2-%ID">
        <div class="card card-body" style="width: 12rem;">
          %RISPOSTA2
        </div>
      </div>
    </div>
    </div>
    <div class="col">
    <div style="min-height: 12rem;">
      <div class="collapse show collapse-horizontal" id="collapse3-%ID">
        <div class="card card-body" style="width: 12rem;">
          %RISPOSTA3
        </div>
      </div>
    </div>
    </div>
    <div class="col">
      <div style="min-height: 12rem;">
        <div class="collapse show collapse-horizontal" id="collapse4-%ID">
          <div class="card card-body" style="width: 12rem;">
            %RISPOSTA4
          </div>
        </div>
      </div>
      </div>
    </div>
    </li>
    `;

const templateClassifica = `
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">%NOME</div>
        %TIME
      </div>
      <span class="badge bg-primary rounded-pill">%PUNTI</span>
    </li>
  `;

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
const inviaDomande = (array, username) => {
  return new Promise((resolve, reject) => {
    fetch("/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: new Date().getTime(),
        username: username,
        answers: array,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        reject("Error:", error);
      });
  });
};
const getClassifica = () => {
  return new Promise((resolve, reject) => {
    fetch("/scores")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log("andato");
        resolve(json);
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
};
const renderQuestion = (question) => {
  let html = "";

  question.forEach((answer) => {
    html += template
      .replace("%TITOLO", answer.question)
      .replace("%IDOMANDA", answer.id)
      .replace("%IDOMANDA", answer.id)
      .replace("%IDOMANDA", answer.id)
      .replace("%IDOMANDA", answer.id)
      .replace("%IDOMANDA", answer.id)
      .replace("%IDOMANDA", answer.id)
      .replace("%IDOMANDA", answer.id)
      .replace("%IDOMANDA", answer.id)
      .replace("%ID", answer.id)
      .replace("%ID", answer.id)
      .replace("%ID", answer.id)
      .replace("%ID", answer.id)
      .replace("%ID", answer.id)
      .replace("%ID", answer.id)
      .replace("%ID", answer.id)
      .replace("%ID", answer.id)
      .replace("%RISPOSTA1", answer.answers[0])
      .replace("%RISPOSTA2", answer.answers[1])
      .replace("%RISPOSTA3", answer.answers[2])
      .replace("%RISPOSTA4", answer.answers[3])
      .replace("%RISPOSTA1", answer.answers[0])
      .replace("%RISPOSTA2", answer.answers[1])
      .replace("%RISPOSTA3", answer.answers[2])
      .replace("%RISPOSTA4", answer.answers[3]);
    id.push(answer.id);
  });

  return html;
};
const renderClassifica = (classifica) => {
  let html = "";
  classifica.forEach((utente) => {
    html += templateClassifica
      .replace("%NOME", utente.username)
      .replace("%PUNTI", utente.rating)
      .replace("%TIME", utente.timestamp);
  });
  return html;
};
inviaModulo.onclick = () => {
  let selezionati = [];
  id.forEach((element) => {
    let selezionato = document.querySelector(
      `input[name="Domanda${element}"]:checked`,
    );
    if (selezionato !== null)
      selezionati.push({
        id: element,
        value: selezionato.value,
      });
    else
      selezionati.push({
        id: element,
        value: null,
      });
  });
  inviaDomande(selezionati, username.value).then((data) => {
    console.log(data);
    getClassifica().then((data) => {
      modalQuiz.hide();
      console.log(data);
      classifica.innerHTML = renderClassifica(data);
    });
  });
};
inviaUser.onclick = () => {
  if (username.value) {
    modalName.hide();
    getQuestion().then((data) => {
      modalQuiz.show();
      modalQuizTitle.innerHTML = data.title;
      modalQuizBody.innerHTML = renderQuestion(data.questions);
      tempo = data.timer;
      countdown = setInterval(() => {
        tempo--;
        if (tempo > 10) {
          tempoRimasto.innerHTML =
            tempo + '<span class="material-symbols-rounded"> schedule </span>';
        } else if (tempo === 0) {
          clearInterval(countdown);
          tempoRimasto.innerHTML = "Tempo esaurito!";
        } else if (tempo <= 10) {
          tempoRimasto.innerHTML =
            tempo +
            '<span class="material-symbols-rounded"> schedule </span></p>';
        }
      }, 1000);
    });
  }
};
