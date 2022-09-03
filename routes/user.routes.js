const express = require('express');
const userControllers = require("../controllers/user.controllers.js");

const router = express.Router();

router.route("/").all((req, res) => {
    res.json({
        body: "user route",
    })
});

router.route("/random").get(userControllers.getRandomUser);
router.route("/all").get(userControllers.getAllUsers);
router.route("/save").post(userControllers.addUser);
router.route("/update/:id").patch(userControllers.updateSingleUser);
router.route("/bulk-update").patch(userControllers.updateMultipleUsers);
router.route("/delete").delete(userControllers.deleteUser);

module.exports = router;