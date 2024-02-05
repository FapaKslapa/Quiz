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

    for (let answer of answers) {
      const correctAnswer = correctAnswers.find((a) => a.id === answer.id);
      if (correctAnswer) {
        totalScore += correctAnswer.points[answer.value] || 0;
      }
    }

    const userScore = scores.find((score) => score.username === username);
    if (userScore) {
      userScore.rating += totalScore;
      userScore.timestamp = timestamp;
    } else {
      scores.push({ username, timestamp, rating: totalScore });
    }

    res.send(`Il punteggio totale di ${username} è ${totalScore}`);
  });
});
