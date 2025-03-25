import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Only allow your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on ${PORT}`)))
  .catch((error) => console.log(error.message));
