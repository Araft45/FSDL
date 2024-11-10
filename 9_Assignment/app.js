const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const pool = require('./config/db'); // Make sure the database connection is working

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/api', userRoutes);

// Test Database Connection
pool.connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL:', err);
    });

// Start Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
