const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes.js');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

app.all("*", (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});