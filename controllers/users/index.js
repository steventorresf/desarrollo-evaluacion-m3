const express = require('express');
const router = express.Router();
const usersMethods = require('./methods');
const { TBadRequest } = require('../../utils/throwError');

// Crea un registro usuario
router.post('/register', async (req, res) => {
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

// Realiza inicio de sesion a un usuario
router.post('/login', async (req, res) => {
    const { user, password } = req.body;
    try {
        if (!user || !password) throw TBadRequest('El usuario y contraseña son obligatorios.');
        const accessToken = await usersMethods.loginUser(user, password);
        if (!accessToken) throw TBadRequest('Token inválido.');
        res.status(200).json(accessToken);
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
});

module.exports = router;