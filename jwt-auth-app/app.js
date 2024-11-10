const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Ensure this path is correct
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the JWT Authentication API!');
});

// Use user routes for all `/api` paths
app.use('/api', userRoutes);

// Fallback 404 handler - This should be at the end
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
