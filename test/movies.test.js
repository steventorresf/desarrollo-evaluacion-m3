const request = require('supertest');
const mongoose = require('mongoose');

const { deleteMovie, createMovieListError } = require('./testData');
const app = require('../app');

beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL);
}, 10000);

afterAll(async () => {
    await mongoose.connection.close();
}, 10000);

describe('Pruebas Unitarias Controlador Movies', () => {
    describe('Pruebas Endpoint', () => {

        test('Prueba de todas las listas de películas', async () => {
            const response = await request(app).
                                   get('/movies/list/all');
            expect(response.statusCode).toBe(200);
        });

        test('Creación de lista de un usuario, lista no creada (usuario invalido)', async () => {
            const response = await request(app).
                                   post(`/movies/create`).
                                   send(createMovieListError);
            expect(response.statusCode).toBe(400);
        });

        test('Elimina película de una lista, lista invalida', async () => {
            const response = await request(app).
                                   delete(`/movies/list/${deleteMovie.id}/delete/${deleteMovie.movie_id}`);
            expect(response.statusCode).toBe(400);
        });
    });
});