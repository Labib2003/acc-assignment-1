const fs = require('fs');
const data = JSON.parse(fs.readFileSync("./data.json"));

module.exports.getRandomUser = (req, res) => {
    const randomNumber = Math.floor(Math.random() * data.length);
    res.status(200).send({
        message: {
            success: true,
            message: "Random user found."
        },
        data: {
            user: data[randomNumber]
        }
    });
};

module.exports.getAllUsers = (req, res) => {
    let { limit } = req.query;
    if (!limit || parseInt(limit) > data.length) limit = data.length;
    res.status(200).send({
        message: {
            success: true,
            message: "Users found."
        },
        data: {
            users: data.slice(0, parseInt(limit))
        }
    });
}