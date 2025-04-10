import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

// port initialization
const PORT = process.env.PORT || 5000;

// app initialization
const app = express();

// middlewares
app.use(express.json());

// api routes
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`server started at PORT: ${PORT}`);
});
