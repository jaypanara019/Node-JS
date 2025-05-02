const express = require('express');
const upload = require('../config/upload');
const route = express.Router();
const movieCTR = require("../controllers/movieController.js");

route.get('/', movieCTR.homePage);
route.get('/form', movieCTR.formPage);
route.post('/movie-submit', upload.single('movieImage'), movieCTR.movieAdd);
route.get('/movieShow/:id', movieCTR.movieShow);
route.get('/delete/delMovie', movieCTR.delMovie);
route.route('/updateMovie/:id')
    .get(movieCTR.updateMovie)
    .post(upload.single('movieImage'), movieCTR.editMovie);

module.exports = route;
