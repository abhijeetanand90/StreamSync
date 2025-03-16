import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();


const PORT= process.env.PORT;

const app=express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL, // Only allow your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
  }));






app.listen(PORT, () => console.log(`Server running on ${PORT}`))
