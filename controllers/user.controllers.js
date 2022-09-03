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
};

module.exports.addUser = (req, res) => {
    const { gender, name, contact, address, photoUrl } = req.body;
    if (!gender || !name || !contact || !address || !photoUrl)
        return res.status(500).send({
            message: {
                success: false,
                message: "Please provide all of the necessary data (gender, name, contact, address and photoUrl)."
            }
        })
    data.push({ id: data.length + 1, ...req.body });
    fs.writeFileSync("./data.json", JSON.stringify(data));
    res.status(200).send({
        message: {
            success: true,
            message: "User added successfully."
        },
        data: {
            users: data
        }
    });
};

module.exports.deleteUser = (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(500).send({
        message: {
            success: false,
            message: "Please provide an id in the body."
        }
    });
    const userToBeDeleted = data.find(d => d.id === id);
    if (!userToBeDeleted) return res.status(404).send({
        message: {
            success: false,
            message: "User with this id does not exist."
        }
    })
    const updatedData = data.filter(d => d.id !== id);
    fs.writeFileSync("./data.json", JSON.stringify(updatedData));
    res.status(200).send({
        message: {
            success: true,
            message: "User deleted successfully."
        },
        data: {
            users: updatedData 
        }
    });
}