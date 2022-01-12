//   "type": "commonjs"
// const express = require('express');
// const {MongoClient} = require('mongodb');

//   "type": "module"
import express from 'express';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

const movies = [
    {
    "id": "104",
    "name": "Interstellar",
    "poster": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
    "rating": 8.6,
    "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
    "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E",
    "language": "english"
    },
    {
    "id": "100",
    "name": "Iron man 2",
    "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
    "rating": 7,
    "summary": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    "trailer": "https://www.youtube.com/embed/wKtcmiifycU",
    "language": "english"
    },
    {
    "id": "101",
    "name": "No Country for Old Men",
    "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    "rating": 8.1,
    "summary": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    "trailer": "https://www.youtube.com/embed/38A__WT3-o0",
    "language": "english"
    },
    {
    "id": "102",
    "name": "Jai Bhim",
    "poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    "rating": 8.8,
    "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA",
    "language": "tamil"
    },
    {
    "id": "103",
    "name": "The Avengers",
    "rating": 8,
    "summary": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
    "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8",
    "language": "english"
    },
    
    {
    "id": "105",
    "name": "Baahubali",
    "poster": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
    "rating": 8,
    "summary": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI",
    "language": "telugu"
    },
    {
    "id": "106",
    "name": "Ratatouille",
    "poster": "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
    "rating": 8,
    "summary": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    "trailer": "https://www.youtube.com/embed/NgsQ8mVkN8w",
    "language": "english"
    }
];

// const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}

//Top level await - new feature
const client = await createConnection(); 

// Rest API endpoints

// Inbuild middleware
// say data is in json and it must be passed that way
// Interceptor for parsing as json
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to express.js');
})


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

app.get('/movies', async (req, res) => {

    // db.movies.find({});
    // Find gives pagination (Cursor) by default, hence we will not get movies by default
    // default result : {
    //     "_events": {},
    //     "_eventsCount": 0
    // }
    // convert cursor to array.

    if(req.query.rating) {
        req.query.rating = +req.query.rating
    }
    console.log(req.query);
    const movies = await client
        .db("guvi")
            .collection("movies")
            .find(req.query)
            .toArray();

    res.send(movies);
})

// Insert Movies

app.post('/movies', async (req, res) => {
    const newMovie = req.body;
    console.log(newMovie);
    const result = await client
        .db("guvi")
        .collection("movies")
        .insertMany(newMovie);

res.send(result);
});

// Get individual movies

app.get('/movies/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id);
    // db.movies.find({id: "102"})
    // const movie = movies.find(mv => mv.id == id);
    const movie = await client
        .db("guvi")
        .collection("movies")
        .findOne({ id: id });
    movie 
    ? res.send(movie) 
    : res
    .status(404)
    .send({message: "No movies found"});
})

app.delete('/movies/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id);
    // db.movies.find({id: "102"})
    // const movie = movies.find(mv => mv.id == id);
    const movie = await client
        .db("guvi")
        .collection("movies")
        .deleteOne({ id: id })
    res.send(movie);
})

// update by movie id
// Interstellar -> rating -> 8.6 -> 9



// C - Create - POST
// R - Read - GET
// U - update - PUT
// D - Delete - DELETE

app.listen(PORT, () => {
    console.log('Server started on port ', PORT);
});