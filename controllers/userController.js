const user = require("../model/User");
const Question = require("../model/Question");
const bcrypt = require("bcrypt");
const moment = require("moment");

const addUser = async (req, res) => {
  try {
    const user_existe = await user.findOne({ email: req.body.email });
    if (user_existe) {
      res.render("register", { error: "L'email existe déja" });
    } else {
      if (req.body.password === req.body.confirmpassword) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const User = new user({ ...req.body, password: hashedPassword });
        await User.save();
        res.redirect("/user/Login");
      } else {
        res.render("register", { error: "Le mot de passe est incorrect" });
      }
    }
  } catch (error) {
    console.error(error);
    res.render("register", {
      error: "Erreur lors de la création de l'utilisateur",
    });
  }
};

const get_login = (req, res) => {
  res.render("login");
};

const get_register = (req, res) => {
  res.render("register");
};

const get_home = async (req, res) => {
  if (req.session.user) {
    try {
      const question = await Question.find()
        .sort({ createdAt: -1 })
        .populate("user_id");
      res.render("home", {
        question: question,
        user: req.session.user,
        moment: moment,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const question = await Question.find()
        .sort({ createdAt: -1 })
        .populate("user_id");
      res.render("home", { question: question, moment: moment });
    } catch (err) {
      console.log(err);
    }
  }
};

const get_logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/user/home");
  } catch (err) {
    console.log(err);
  }
};

const post_login = async (req, res) => {
  try {
    res.redirect("/user/home");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addUser,
  get_login,
  get_register,
  get_home,
  get_logout,
  post_login,
};
