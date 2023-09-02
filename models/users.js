const { Schema, model } = require('mongoose');
const { compare, genSalt, hash } = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo electrónico es obligatorio.']
    },
    name: {
        type: String,
        required: [true, 'El nombre completo es obligatorio']
    },
    nickname: {
        type: String,
        unique: true,
        required: [true, 'El nickname es obligatorio']
    },
    birthdate: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdate' } });

userSchema.pre('save', async function (next) {
    //si el password no se modifica no haremos nada
    if (!this.isModified('password')) return next();

    const salt = await genSalt(+process.env.SALTING_ROUNDS);
    this.password = await hash(this.password, salt);
    next();

});

userSchema.methods.comparePassword = async function (plainText) {
    return await compare(plainText, this.password);
}

const User = model('User', userSchema);
module.exports = User;