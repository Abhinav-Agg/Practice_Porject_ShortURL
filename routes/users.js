const express = require("express");
const router = express.Router();
const {handleSignup, handleLogin} = require("../controllers/userController");

router.post("/Signup", handleSignup);
router.post("/Login", handleLogin);

module.exports = router;