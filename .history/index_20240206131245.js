const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const http = require("http");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));

let scores = [];

const server = http.createServer(app);
server.listen(80, () => {
  console.log("- server running");
});

app.get("/scores", (req, res) => {
  res.send(scores);
});

app.get("/question", (req, res) => {
  fs.readFile("question.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send("Si è verificato un errore durante la lettura del file");
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post("/answer", (req, res) => {
  const { username, timestamp, answers } = req.body;

  if (!username || !timestamp || !answers) {
    res.status(400).send("Richiesta non valida");
    return;
  }

  fs.readFile("answer.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send("Si è verificato un errore durante la lettura del file");
      return;
    }
  
    const correctAnswers = JSON.parse(data);
    let totalScore = 0;
  
    // Itera attraverso le risposte fornite
    for (let i = 0; i < answers.length; i++) {
      // Trova la domanda corrispondente nel file answer.json
      const question = correctAnswers.find(q => q.id === i + 1);
  
      // Se la domanda esiste e la risposta è corretta, aggiungi il punteggio corrispondente
      if (question && answers[i] !== null) {
        totalScore += question.points[answers[i]];
      }
    }
  
    res.send(`Il punteggio totale di ${username} è ${totalScore}`);
  });
});
