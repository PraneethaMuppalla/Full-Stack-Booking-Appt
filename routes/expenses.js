const express = require("express");
const router = express.Router();

const expensesController = require("../controllers/expenses");

router.post("/expenses", expensesController.postExpense);
router.get("/expenses", expensesController.getExpenses);
router.get("/expenses/:expenseId", expensesController.getExpense);
router.delete("/expenses/:expenseId", expensesController.deleteExpense);
module.exports = router;
