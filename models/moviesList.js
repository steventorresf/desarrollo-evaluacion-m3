const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");

const movieSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la película es obligatorio']
    },
    year: {
        type: Number,
        required: [true, 'El año de la película es obligatorio']
    },
    image: {
        type: String
    }
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdate' } });

const moviesListSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la lista es obligatorio']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        unique: true,
        required: [true, 'El user es obligatorio'],
        ref: "User"
    },
    rating: {
        type: Number,
        default: 5,
        required: [true, 'La calificación de la lista es obligatoria']
    },
    movies: [movieSchema]
}, { timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdate' } });

const MoviesList = model('MoviesList', moviesListSchema);
module.exports = MoviesList;