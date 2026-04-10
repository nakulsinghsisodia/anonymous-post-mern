const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Confession = require('../models/Confession');

// @route GET api/confessions
// @desc Get all confessions
// @access Public
router.get('/', async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ createdAt: -1 }).populate('author', 'username');
    
    // Map confessions to handle anonymity
    const processedConfessions = confessions.map(conf => {
      const confObj = conf.toObject();
      if (confObj.isAnonymous) {
        delete confObj.author; // Omit author details if anonymous
      }
      return confObj;
    });

    res.json(processedConfessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/confessions/mine
// @desc Get logged in user's confessions
// @access Private
router.get('/mine', auth, async (req, res) => {
  try {
    const confessions = await Confession.find({ author: req.user.id })
      .sort({ createdAt: -1 })
      .populate('author', 'username');

    res.json(confessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/confessions
// @desc Create a confession
// @access Private
router.post('/', auth, async (req, res) => {
  try {
    const newConfession = new Confession({
      content: req.body.content,
      isAnonymous: req.body.isAnonymous,
      author: req.user.id
    });

    const confession = await newConfession.save();
    res.json(confession);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/confessions/:id/like
// @desc Like a confession
// @access Private
router.put('/:id/like', auth, async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);

    if (!confession) {
      return res.status(404).json({ message: 'Confession not found' });
    }

    // Check if the user has already liked it
    if (confession.likes.some(like => like.toString() === req.user.id)) {
        // Unlike
        confession.likes = confession.likes.filter(like => like.toString() !== req.user.id);
    } else {
        // Like
        confession.likes.unshift(req.user.id);
    }

    await confession.save();
    res.json(confession.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/confessions/:id
// @desc Delete a confession owned by logged in user
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);

    if (!confession) {
      return res.status(404).json({ message: 'Confession not found' });
    }

    if (confession.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed to delete this confession' });
    }

    await confession.deleteOne();
    res.json({ message: 'Confession deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
