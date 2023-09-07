const express = require('express');
const router = express.Router();
const moviesMethods = require('./methods');
const { TBadRequest } = require('../../utils/throwError');
const authMiddleware = require('../../middlewares/authorization');

// Lista todas las listas de películas
router.get('/list/all', async (req, res) => {
    try {
        const moviesList = await moviesMethods.getAllMovieList();
        res.status(200).json(moviesList);
    }
    catch (error) {
        res.status(error.statusCode).json(error);
    }
});

// Obtiene una lista de película por ID
router.get('/list/id/:id', async (req, res) => {
    try {
        const result = await moviesMethods.getMovieListById(req.params.id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(error.statusCode).json(error);
    }
});

// Obtiene una lista de película por Nickname
router.get('/list/user/:nickname', async (req, res) => {
    try {
        const result = await moviesMethods.getMovieListByUser(req.params.nickname.toUpperCase());
        res.status(200).json(result);
    }
    catch (error) {
        res.status(error.statusCode).json(error);
    }
});

// Crea una lista de películas
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { nameMovieList, nickname } = req.body;
        if (!nameMovieList || !nickname) throw TBadRequest('El nombre de la lista y el nickname son obligatorios');

        const result = await moviesMethods.registerMovieList(nameMovieList, nickname);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(error.statusCode).json(error);
    }
});

// Agrega una película a una lista de un usuario
router.post('/list/:id/add', authMiddleware, async (req, res) => {
    try {
        const result = await moviesMethods.registerMovie(req.params.id, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error);
    }
});

// Elimina una película de una lista
router.delete('/list/:id/delete/:movie_id', authMiddleware, async (req, res) => {
    try {
        const result = await moviesMethods.deleteMovie(req.params.id, req.params.movie_id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(error.statusCode).json(error);
    }
});

// Califica una lista de un usuario
router.put('/list/:id/rate/:rate', authMiddleware, async (req, res) => {
    try {
        const result = await moviesMethods.updateMovieRate(req.params.id, req.params.rate);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(error.statusCode).json(error);
    }
});

module.exports = router;