const express = require('express');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.post('/upload', auth, admin, upload.single('media'), (req, res) => {
    res.status(200).json({ filePath: req.file.path });
});

module.exports = router;
