const movies = require('../models/movieSchema');
const fs = require('fs');
const path = require('path');

const homePage = async (req, res) => {
    try {
        const records = await movies.find();
        res.render('home', { record: records });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Server Error');
    }
};

const formPage = (req, res) => res.render('form');

const movieAdd = async (req, res) => {
    if (req.file) req.body.movieImage = req.file.path;
    const insert = await movies.create(req.body);
    insert ? console.log('Movie data inserted...') : console.log('Movie data not inserted...');
    res.redirect('/');
};

const movieShow = async (req, res) => {
    try {
        const movie = await movies.findById(req.params.id);
        if (!movie) return res.status(404).send("Movie not found");
        res.render('movieDetails', { movie });
    } catch (error) {
        console.error("Error in movieShow:", error);
        res.status(500).send("Server error");
    }
};

const delMovie = async (req, res) => {
    try {
        const result = await movies.findByIdAndDelete(req.query.id);
        if (result) {
            const imagePath = path.join(__dirname, '..', result.movieImage);
            fs.existsSync(imagePath) && fs.unlinkSync(imagePath);
            console.log('Movie deleted and image removed');
        } else console.log("Movie not found");
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).send('Server Error');
    }
};

const updateMovie = async (req, res) => {
    const record = await movies.findById(req.params.id);
    res.render('upmovie', { record });
};

const editMovie = async (req, res) => {
    try {
        const movie = await movies.findById(req.params.id);
        if (!movie) return res.status(404).send('Movie not found');

        if (req.file) {
            const oldImagePath = path.join(__dirname, '..', movie.movieImage);
            fs.existsSync(oldImagePath) && fs.unlinkSync(oldImagePath);
            req.body.movieImage = req.file.path;
        } else {
            req.body.movieImage = movie.movieImage;
        }

        const upData = await movies.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log('Movie updated:', upData);
        res.redirect('/');
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    homePage,
    formPage,
    movieAdd,
    delMovie,
    updateMovie,
    editMovie,
    movieShow,
};
