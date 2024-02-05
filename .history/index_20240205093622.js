const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const http = require("http");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));



const server = http.createServer(app);
server.listen(80, () => {
  console.log("- server running");
});

app.get("/question", (req, res) => {
  
}) 


app.get("/question", (req, res) => {
  fs.readFile('answer.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Si è verificato un errore durante la lettura del file');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post("/answer", (req, res) => {
  const { username, timestamp, answers } = req.body;

  if (!username || !timestamp || !answers) {
    res.status(400).send('Richiesta non valida');
    return;
  }

  fs.readFile('answer.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Si è verificato un errore durante la lettura del file');
      return;
    }

    const correctAnswers = JSON.parse(data);
    const isAnswerValid = answers.every(answer => {
      const correctAnswer = correctAnswers.find(a => a.id === answer.id);
      return correctAnswer && correctAnswer.value === answer.value;
    });

    if (isAnswerValid) {
      res.send('Le risposte sono corrette');
    } else {
      res.send('Le risposte non sono corrette');
    }
  });
});