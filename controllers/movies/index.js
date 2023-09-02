const express = require('express');
const router = express.Router();
const moviesMethods = require('./methods');
const { TBadRequest } = require('../../utils/throwError');

router.get('/list/:user_id', async (req, res) => {
    try {
        const user = await usersMethods.registerUser(req.body);
        res.status(200).json({
            message: 'El usuario ha sido registrado exitosamente.',
            data: user
        });
    }
    catch (error) {
        res.status(error.statusCode).json(error);
    }
});

router.post('/create', async (req, res) => {
    try {
        const user = await usersMethods.registerUser(req.body);
        res.status(200).json({
            message: 'El usuario ha sido registrado exitosamente.',
            data: user
        });
    }
    catch (error) {
        res.status(error.statusCode).json(error);
    }
});

router.delete('/list/:user_id/delete/:movie_id', async (req, res) => {
    try {
        const user = await usersMethods.registerUser(req.body);
        res.status(200).json({
            message: 'El usuario ha sido registrado exitosamente.',
            data: user
        });
    }
    catch (error) {
        res.status(error.statusCode).json(error);
    }
});

router.put('/list/:user_id/rate', (req, res) => {
    res.send("Endpoint para calificar listas de otros usuarios");
});

module.exports = router;