const express = require("express");
const {generateNewURL , redirectedURL} = require("../controllers/urlController")
const router = express.Router();

router.post("/", generateNewURL);

router.get("/:shortId" , redirectedURL);


module.exports = router;