const jwt = require("jsonwebtoken");
const User = require('../../models/users');
const { TNotFound, TBadRequest, TError } = require("../../utils/throwError");

const createToken = async (user, role) => {
    const tokenPayload = {
        "username": user,
        "role": role
    }
    const token = await jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_TTL }
    );
    return token;
}

const registerUser = async (payload) => {
    try {
        const user = new User(payload);
        await user.save();
        return user;
    }
    catch (error) {
        if (error.code === 11000) throw TBadRequest('Este usuario no está disponible');
        else if (error.name === 'ValidationError') throw TBadRequest(error.message);
        else throw TError(error.message);
    }
};

const loginUser = async (username, password) => {
    const user = await User.findOne({ nickname: username });
    if (!user) throw TNotFound('Usuario y/o contraseña invalida.');

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw TNotFound('Usuario y/o contraseña invalida.');

    return await createToken(username, "ADMIN");
};

module.exports = { createToken, registerUser, loginUser }