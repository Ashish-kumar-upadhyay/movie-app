const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const Movie = require('../models/Movie');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/movies', auth, upload.single('image'), async (req, res) => {
  try {
    const movie = new Movie({
      ...req.body,
      image: req.file.filename,
      userId: req.user.userId
    });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: "Failed to create movie" });
  }
});

router.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

module.exports = router;
