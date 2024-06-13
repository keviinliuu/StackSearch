import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import queriesRouter from './routes/queries';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(express.json());
app.use(queriesRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})