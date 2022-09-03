const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes.js');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);

app.all("*", (req, res) => {
    res.send({
        greeting: "Welcome to my random user api. Here is a brief documentation for you to get started.",
        responseFormat: `message: {success: true, message: "Users found"}, data: { users: data}`,
        documentation: {
            "GET /api/user/random": "This endpoint will get a random data from the json file.",
            "GET /api/user/all": "This will send an array with all of the user from the json file. You can optionally send 'limit' as a query parameter to limit the number of users in the response",
            "POST /api/user/save": "This will take a new users data as a json in the body and append it to the file. You must send all the properties of an user (gender, name, contact, address and photoUrl). Otherwise the server will respond with an error.",
            "PATCH /api/user/update/:id": "This will take the id of an user as a parameter and the updated data as an json in the body and will update the user and send the updated user data as response.",
            "PATCH /api/user/bulk-update": "This will take an array of objects in the body with each object having 2 properties, id and update. The update property will be an object with the updated data. The server will update each ids with their corresponding data and send the updated users as response.",
            "DELETE /api/user/delete": "This will take a json from the body with a property called id and delete the user with that id."
        }
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});