const express = require('express');
const { login, register } = require('../controllers/authController');
const { createArticle, deleteArticle } = require('../controllers/articleController'); // Ensure these are correctly imported
const auth = require('../middleware/auth'); // Declare middleware before use
const admin = require('../middleware/admin');
const upload = require('../middleware/upload');

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);

// File upload route
router.post('/upload', auth, upload.single('media'), (req, res) => {
    res.status(200).json({ filePath: req.file.path });
});

// Article routes
router.post('/create', auth, admin, createArticle);
router.delete('/:id', auth, admin, deleteArticle);

const { getArticles } = require('../controllers/articleController');

// Add this line to support fetching articles
router.get('/', getArticles);

module.exports = router;
