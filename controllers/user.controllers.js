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

module.exports.updateSingleUser = (req, res) => {
    const { id } = req.params;
    const update = req.body;
    if (!id) return res.status(500).send({
        message: {
            success: false,
            message: "Please send the id of the user as parameter."
        }
    });
    if (!update) return res.status(500).send({
        message: {
            success: false,
            message: "Please send a json with the updated data in the body."
        }
    });
    const userToBeUpdated = data.find(d => d.id == id);
    if (!userToBeUpdated) return res.status(404).send({
        message: {
            success: false,
            message: "User with this id does not exist."
        }
    });
    const index = data.indexOf(userToBeUpdated);
    const updatedUser = { ...userToBeUpdated, ...update };
    data[index] = updatedUser;
    fs.writeFileSync("./data.json", JSON.stringify(data));
    res.status(200).send({
        message: {
            success: true,
            message: "User updated successfully."
        },
        data: {
            updatedUser
        }
    });
};

module.exports.updateMultipleUsers = (req, res) => {
    const updates = req.body;
    const updatedUsers = [];
    if (!Array.isArray(updates)) return res.status(500).send({
        message: {
            success: false,
            message: "Please send an array of objects with these key-values, id and update(an object with the updated values)"
        }
    });
    updates.forEach(u => {
        console.log(u.id);
        const { id, update } = u;
        if (id === undefined || null) return res.status(500).send({
            message: {
                success: false,
                message: "Id not found in one of the objects. Please send an array of objects with these key-values, id and update(an object with the updated values)"
            }
        });
        const userToBeUpdated = data.find(d => d.id == id);
        if (userToBeUpdated) {
            const index = data.indexOf(userToBeUpdated);
            const updatedUser = { ...userToBeUpdated, ...update };
            updatedUsers.push(updatedUser);
            data[index] = updatedUser;
        }
        else {
            updatedUsers.push({
                success: false,
                message: "User with this id does not exist."
            });
        }
    });
    fs.writeFileSync("./data.json", JSON.stringify(data));
    res.status(200).send({
        message: {
            success: true,
            message: "User updated successfully."
        },
        data: {
            updatedUsers
        }
    });
}

module.exports.deleteUser = (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(500).send({
        message: {
            success: false,
            message: "Please provide an json with id property in the body."
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