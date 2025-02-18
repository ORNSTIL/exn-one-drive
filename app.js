const express = require('express');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Dynamically import node-fetch
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
}).catch(err => console.error('Failed to load node-fetch', err));

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true
}));

// Route to serve the homepage (login page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.use('/api/users', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
