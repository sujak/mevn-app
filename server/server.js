const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const { NODE_ENV, PORT, ATLAS_URI } = process.env;
const isDev = NODE_ENV !== 'production';
const port = PORT || 5000;

// Set up Mongoose
mongoose.connect(ATLAS_URI);
mongoose.connection.once('open', () => console.log('MongoDB database connection established successfully!'));

// Set up middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// API routes
app.use('/api/companies', require('./routes/api/companies'))
app.use('/api/register', require('./routes/api/register'))
app.use('/api/login', require('./routes/api/login'))

// Handle production
if (!isDev) {
    // Static folder
    app.use(express.static(__dirname + '/public'));
    // SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.listen(port, () => {
    console.log(`Server started in ${NODE_ENV} mode. Server started on port ${port}`)
});

module.exports = app;