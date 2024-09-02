// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const productRouters = require('./routes/productsRoutes');
const userRoute = require('./routes/userRoute');
const category = require('./routes/categoryRoutes')
require('dotenv').config();



const app = express();
const port = process.env.PORT || 5000;

const corsOperation = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD ",
    credentials: true,
}
app.use(cors(corsOperation));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;

database.on('error', (err) => {
    console.error('Database connection error:', err);
});

database.once('connected', () => {
    console.log('Connected to database');
});

app.use('/api/product', productRouters); // Define product routes
app.use('/api/user', userRoute); // Define user routes
app.use('/api/category', category);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});