const express = require("express");
const { dbModels } = require("../config/dbModel.js");
const { urlModel } = dbModels;

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) return res.redirect("/auth/Login");

    const getAllRecords = await urlModel.findAll({ where: { CreatedBy: req.user.id } });

    return res.render("home", {
        urlRecords: getAllRecords
    });
});

// Here its a api but now we are create like a url.
router.get("/auth/Signup", (req, res) => {
    return res.render("signup");
});

router.get("/auth/Login", (req, res) => {
    return res.render("login");
});


module.exports = router;