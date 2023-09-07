require('dotenv').config();
const express = require('express');
const app = express();

//MW incluidos
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const usersController = require('./controllers/users');
const moviesController = require('./controllers/movies');

app.use('/users', usersController);
app.use('/movies', moviesController);

app.get('/', async (req, res) => {
    res.send('Bienvenido a nuestro backend');
});

module.exports = app;