const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');

dotenv.config();
connectDB();

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Logging for development
    console.log('Running in Development Mode');
} else if (process.env.NODE_ENV === 'production') {
    console.log('Running in Production Mode');
}

app.use(cors({ origin: 'http://localhost:3000' })); // Adjust CORS settings
app.use(express.json());

// Routes
app.use('/api/articles', require('./routes/articleRoutes'));

// Health Check
app.get('/api/ping', (req, res) => {
    res.json({ message: 'Server is up and running!' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5136;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
