const Question = require("../model/Question");

//fonction ajoute question :
const Ajouter_question = (req, res) => {
  const question = new Question(req.body);
  question
    .save()
    .then(() => {
      res.redirect("/user/home");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { Ajouter_question };