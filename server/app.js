require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3102;

const pokemonRoute = require('./routes/pokemon');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/pokemon', pokemonRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

