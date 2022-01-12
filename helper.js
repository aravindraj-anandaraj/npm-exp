import { client } from './index.js';

export async function deleteMovieById(id) {
    return await client
        .db("guvi")
        .collection("movies")
        .deleteOne({ id: id });
}
export async function getMovieById(id) {
    return await client
        .db("guvi")
        .collection("movies")
        .findOne({ id: id });
}
export async function addMovie(newMovie) {
    return await client
        .db("guvi")
        .collection("movies")
        .insertMany(newMovie);
}
export async function getAllMovies(req) {
    return await client
        .db("guvi")
        .collection("movies")
        .find(req.query)
        .toArray();
}
export async function updateMovieById(id, updateMovie) {
    return await client
        .db("guvi")
        .collection("movies")
        .updateOne({ id: id }, { $set: updateMovie});
}
