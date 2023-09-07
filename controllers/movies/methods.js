const MoviesList = require('../../models/moviesList');
const User = require('../../models/users');
const { TBadRequest, TNotFound } = require('../../utils/throwError');

// Metodo que obtiene todas las listas de películas
const getAllMovieList = async () => {
    const movieList = (await MoviesList.find().populate('user', { _id: 0, name: 1, email: 1, nickname: 1 })).map(item => {
        return {
            _id: item._id,
            user: item.user.nickname,
            name: item.name,
            rating: item.rating
        }
    });
    return { message: 'Las listas han sido obtenidas exitosamente.', data: movieList };
};

// Metodo que obtiene una lista de película por ID
const getMovieListById = async (id) => {
    const movieList = await MoviesList.findOne({ _id: id });
    if (!movieList) return TNotFound('No existe una lista de peliculas con ese ID.')
    if (!(movieList.movies.length > 0)) return { message: `La lista de películas no tiene registros.` };

    return { message: `La lista de películas ha sido obtenida exitosamente.`, data: movieList };
};

// Metodo que obtiene una lista de película por Nickname
const getMovieListByUser = async (nickname) => {
    const user = await User.findOne({ nickname: nickname });
    if (!user) throw TBadRequest('El nickname no es valido.');

    const movieList = await MoviesList.findOne({ user: user._id });
    if (!movieList) return { message: `El usuario '${nickname}' aún no ha creado su lista de películas.` };
    if (!(movieList.movies.length > 0)) return { message: `La lista de películas del usuario '${nickname}' no tiene registros.` };

    return { message: `La lista de películas del usuario '${nickname}' ha sido obtenida exitosamente.`, data: movieList };
};

// Metodo que crea una lista de películas
const registerMovieList = async (nameMovieList, nickname) => {
    const user = await User.findOne({ nickname: nickname?.toUpperCase() });
    if (!user) throw TBadRequest('El nickname no es valido.');

    const movieListUpdate = await MoviesList.findOneAndUpdate({ user: user._id }, { name: nameMovieList, user: user._id }, { new: true });
    if (movieListUpdate) return { message: 'La lista ha sido actualizada exitosamente.', data: movieListUpdate };

    const movieListNew = new MoviesList({ name: nameMovieList, user: user._id });
    await movieListNew.save();
    return { message: 'La lista ha sido creada exitosamente.', data: movieListNew };
};

// Metodo que agrega una película a una lista de películas
const registerMovie = async (id, payload) => {
    const movie = await MoviesList.findOneAndUpdate({ _id: id }, { $push: { movies: payload } }, { new: true });
    if (!movie) throw TBadRequest('La lista es invalida.');
    return { message: 'La película ha sido registrada exitosamente.', data: movie.movies[movie.movies.length - 1] };
};

// Metodo que elimina una película de una lista de películas
const deleteMovie = async (id, movie_id) => {
    const movieList = await MoviesList.findOne({ _id: id });
    if (!movieList) throw TBadRequest('La lista es invalida.');

    movieList.movies.remove({ _id: movie_id });
    movieList.save();

    return { message: 'La película ha sido eliminada exitosamente.' };
};

// Metodo que califica una lista de películas
const updateMovieRate = async (id, rate) => {
    const movieList = await MoviesList.findOneAndUpdate({ _id: id }, { rating: rate }, { new: true });
    if (!movieList) throw TNotFound('La película no existe.');

    const user = await User.findById(movieList.user);

    return {
        message: 'El rating de la película ha sido actualizada exitosamente.',
        data: {
            _id: movieList._id,
            user: user.nickname,
            name: movieList.name,
            rating: movieList.rating
        }
    };
};

module.exports = { getAllMovieList, getMovieListById, getMovieListByUser, registerMovieList, registerMovie, deleteMovie, updateMovieRate }