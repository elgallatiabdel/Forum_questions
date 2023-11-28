const express = require("express");
const routerQuestion = express.Router();
const questionController = require("../controllers/questionController")

routerQuestion.post("/add_question", questionController.Ajouter_question);

module.exports = routerQuestion;