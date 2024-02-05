const modalQuiz = new bootstrap.Modal("#modalQuiz");
const modalName = new bootstrap.Modal("#modalName");
const inviaUser = document.getElementById("inviaUser");
const username = document.getElementById("username");
inviaUser.onclick = () => {
  if (username.value) {
    modalName.hide();
    getQuestion().then((data) => {
      modalQuiz.show();
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
