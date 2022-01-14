//   "type": "commonjs"
// const express = require('express');
// const {MongoClient} = require('mongodb');

//   "type": "module"
import express from 'express';
import {MongoClient} from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { moviesRouter } from './routes/movies.js';
import { usersRouter } from './routes/users.js';

const app = express();
const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}

//Top level await - new feature
export const client = await createConnection(); 

// Rest API endpoints

// Inbuild middleware
// say data is in json and it must be passed that way
// Interceptor for parsing as json
app.use(express.json());
// To allow cors
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to express.js');
})

app.use('/movies', moviesRouter);

app.use('/users', usersRouter);

// update by movie id
// Interstellar -> rating -> 8.6 -> 9



// C - Create - POST
// R - Read - GET
// U - update - PUT
// D - Delete - DELETE

app.listen(PORT, () => {
    console.log('Server started on port ', PORT);
});

// console.log(genPassword("pass@123")); 