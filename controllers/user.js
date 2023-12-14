const User = require("../models/user");

exports.postAppointment = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  User.create({
    name,
    email,
  })
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((e) => {
      console.error(e);
    });
};

exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((result) => res.json(result))
    .catch((err) => console.error(err));
};

exports.getUser = (req, res, next) => {
  const userId = +req.params.userId;
  User.findByPk(userId)
    .then((result) => res.json(result))
    .catch((err) => console.error(err));
};

exports.deleteUser = (req, res, next) => {
  const userId = +req.params.userId;
  User.destroy({
    where: { id: userId },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
};
