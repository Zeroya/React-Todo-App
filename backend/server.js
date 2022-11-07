import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => { console.log(`all right  ${PORT}`) });
