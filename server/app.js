const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/weatherApp')
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database connection error', err));


const userRoutes = require('./routes/userRoute.js');

const app = express();
app.use(cors({ origin: 'http://localhost:5000', credentials: true, }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: '12345', resave: false, saveUninitialized: true }));

app.use('/', userRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Invalid Operation" });
});

app.listen(3000, () => console.log('Server connected'));