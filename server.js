require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const usersRoute = require('./src/users');
const profileRoute = require('./src/profile');

const app = express();
const port = 3030;

app.use(bodyParser.json());

app.use('/users', usersRoute);
app.use('/profile', profileRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
