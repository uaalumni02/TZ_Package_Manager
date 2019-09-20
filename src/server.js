import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))




app.listen(port, () => console.log('server is running'));
