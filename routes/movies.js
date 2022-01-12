import { getAllMovies, addMovie, getMovieById, deleteMovieById, updateMovieById } from '../helper.js';

import express from 'express';
const router = express.Router();

// Insert Movies
router.post('/', async (req, res) => {
    const newMovie = req.body;
    console.log(newMovie);
    const result = await addMovie(newMovie);

    res.send(result);
});
// app.get('/movies', (req, res) => {
//     const { language, rating } = req.query;
//     console.log(req.query, language, rating);
//     let filteredMovies = movies;
//     if(language) {
//         filteredMovies = filteredMovies.filter(mv => mv.language == language);
//     }
//     if(rating) {
//         filteredMovies = filteredMovies.filter(mv => mv.rating == +rating);
//     }
//     res.send(filteredMovies);
// })
// Change the above in db compatible
router.get('/', async (req, res) => {
    // db.movies.find({});
    // Find gives pagination (Cursor) by default, hence we will not get movies by default
    // default result : {
    //     "_events": {},
    //     "_eventsCount": 0
    // }
    // convert cursor to array.

    if (req.query.rating) {
        req.query.rating = +req.query.rating;
    }
    console.log(req.query);
    const movies = await getAllMovies(req);

    res.send(movies);
});
// Get individual movies
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    // db.movies.find({id: "102"})
    // const movie = movies.find(mv => mv.id == id);
    const movie = await getMovieById(id);
    movie
        ? res.send(movie)
        : res
            .status(404)
            .send({ message: "No movies found" });
});
// Update movie by id
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const updateMovie = req.body;
    console.log(updateMovie);
    // db.movies.updateOne({id: '102'}, {$set: updateMovie})
    const updatedMovie = await updateMovieById(id, updateMovie);
    res.send(updatedMovie);
})
// Delete individual movies
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    // db.movies.find({id: "102"})
    // const movie = movies.find(mv => mv.id == id);
    const movie = await deleteMovieById(id);
    res.send(movie);
});

export const moviesRouter = router;