const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/users", userController.postAppointment);
router.get("/users", userController.getUsers);
router.get("/users/:userId", userController.getUser);
router.delete("/users/:userId", userController.deleteUser);
module.exports = router;
