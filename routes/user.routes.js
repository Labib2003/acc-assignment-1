const express = require('express');
const userControllers = require("../controllers/user.controllers.js");

const router = express.Router();

router.route("/").all((req, res) => {
    res.json({
        body: "hello world",
    })
});

router.route("/random").get(userControllers.getRandomUser);
router.route("/all").get(userControllers.getAllUsers);

module.exports = router;