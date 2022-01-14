import { client } from './index.js';
import bcrypt from 'bcrypt';

// Movies
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

// Password
export async function genPassword(password) {
    const salt = await bcrypt.genSalt(10); //bcrypt.genSalt(no. of rounds)
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// Users
export async function createUser(username, password) {
    return await client
        .db("guvi")
        .collection("users")
        .insertOne({ username, password });
}
export async function getUserByName(username) {
    return await client
        .db("guvi")
        .collection("users")
        .findOne({ username: username });
}