const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth"); // Corrected function name

const router = express.Router();

router.get("/admin/urls", restrictTo(['ADMIN']), async (req, res) => { // Corrected function name
    const allUrls = await URL.find();
     
    res.render("home", {
        urls: allUrls,
    });
}); 

router.get("/", restrictTo(["NORMAL"]), async (req, res) => { // Corrected function name
    const allUrls = await URL.find({ createdBy: req.user._id });
    
    res.render("home", {
        urls: allUrls,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
