const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config');

// db connection
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false });
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => console.log('Connected to DB!'));

app.use(express.json());

const blogRoutes = require('./routes/blogRoutes');

app.use('/blogs', blogRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log('Server listening on port '+ PORT));