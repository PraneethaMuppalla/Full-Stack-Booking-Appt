const Expenses = require("../models/expenses");

exports.postExpense = (req, res, next) => {
  Expenses.create({ ...req.body })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error("Error during post expense ===>>>>", err);
    });
};

exports.getExpenses = (req, res, next) => {
  Expenses.findAll()
    .then((result) => res.json(result))
    .catch((err) => {
      console.error("Error during get expenses ===>>>>", err);
    });
};

exports.deleteExpense = (req, res, next) => {
  const expenseId = +req.params.expenseId;
  Expenses.destroy({ where: { id: expenseId } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error("error while deleting expense ==>>>", err);
    });
};

exports.getExpense = (req, res, next) => {
  const expenseId = +req.params.expenseId;
  Expenses.findByPk(expenseId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error("error while getting single expense ==>>>", err);
    });
};
