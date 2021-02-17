const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Chat = require('../../models/Chat');
const User = require('../../models/User');

// POST api/chats
// Create a chat
// Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newChat = new Chat({
      user1: user,
      user2: req.body.user2
    });

    const chat = await newChat.save();

    res.json(chat);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET api/chats
// Get all chats
// Private
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET api/chats/myChats
// Get all chats
// Private
router.get('/myChats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const chats1 = await Chat.find({ user1: user });
    const chats2 = await Chat.find({ user2: user });

    const chats = [...chats1, ...chats2];

    res.json(chats);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET api/chats/:id
// Get chat with user
// Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    let chats = await Chat.find({ user1: user, user2: req.params.id });
    chats = [
      ...chats,
      ...(await Chat.find({ user1: req.params.id, user2: user }))
    ];

    res.json(chats);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// POST api/chats/message/:id
// Send a message to a chat
// Private
router.post('/message/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const chat = await Chat.findById(req.params.id);

    const newMessage = {
      sender: user,
      text: req.body.text
    };

    chat.messages.push(newMessage);

    await chat.save();

    res.json(chat.messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
