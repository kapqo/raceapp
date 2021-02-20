const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Notification = require('../../models/Notification');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// POST api/notifications
// Create a notification
// Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newNotification = new Notification({
      user: user,
      text: req.body.text,
      link: req.body.link
    }).populate('user');

    const notification = await newNotification.save();

    res.json(notification);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET api/notifications
// Get all notifications
// Private
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find().populate('user');
    res.json(notifications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET api/notifications/myNotifications
// Get my notifications
// Private
router.get('/myNotifications', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('_id');

    const following = await Profile.find({ user: user })
      .select('following')
      .select('-_id');

    const notifications = await Notification.find();

    // const notifications = await Notification.filter(
    //   notification =>
    //     notification.text > 0 &&
    //     following[0].find(following => following.user === notification.user)
    // );

    console.log(following.following);
    res.json(notifications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
