const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// GET api/profile/me
// Get current users profile
// Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET api/profile/me
// Get current profile followings
// Private
router.get('/myFollowing', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile.following);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// POST api/profile
// Create or update user profile
// Private
router.post(
  '/',
  [auth, [check('interests', 'Interests are required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      user,
      location,
      bio,
      interests,
      avatar,
      instagram,
      facebook,
      youtube
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (interests) {
      profileFields.interests = interests
        .split(',')
        .map(interests => interests.trim());
    }

    //Build social object
    profileFields.social = {};
    if (instagram) profileFields.social.instagram = instagram;
    if (facebook) profileFields.social.facebook = facebook;
    if (youtube) profileFields.social.youtube = youtube;

    const userFields = {};
    if (avatar) userFields.avatar = avatar;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      let user = await User.findOne({ _id: req.user.id });

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        user = await User.findOneAndUpdate(
          { _id: req.user.id },
          {
            $set: {
              avatar: userFields.avatar
            }
          },
          { new: true }
        );

        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);
      user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: {
            avatar: userFields.avatar
          }
        },
        { new: true }
      );

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// GET api/profile
// Get all profiles
// Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET api/profile/user/:user_id
// Get profile by user ID
// Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar', 'banned']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// GET api/profile/vehicle/:veh_id
// Get Vehivle by vehicle ID
// Public
router.get('/vehicle/:veh_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) return res.status(400).json({ msg: 'Vehicle not found' });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Vehicle not found' });
    }
    res.status(500).send('Server Error');
  }
});

// DELETE api/profile
// Delete profile, user and posts
// Private
router.delete('/', auth, async (req, res) => {
  try {
    //Remove user posts
    await Post.deleteMany({ user: req.user.id });
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// PUT api/profile/vehicle
// Add vehicles to profile
// Private
router.put(
  '/vehicle',
  [
    auth,
    [
      check('brand', 'Brand is required').not().isEmpty(),
      check('model', 'Model is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      brand,
      model,
      engine,
      hp,
      fuel,
      year,
      description,
      photo
    } = req.body;

    const newVeh = {
      brand,
      model,
      engine,
      hp,
      fuel,
      year,
      description,
      photo
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.vehicle.unshift(newVeh);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// DELETE api/profile/vehicle/:veh_id
// Delete vehicle from profile
// Private
router.delete('/vehicle/:veh_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.vehicle
      .map(item => item.id)
      .indexOf(req.params.veh_id);

    profile.vehicle.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// PUT api/profile/vehicle
// Edit vehicles to profile
// Private
router.put(
  '/vehicle/:veh_id',
  [
    auth,
    [
      check('brand', 'Brand is required').not().isEmpty(),
      check('model', 'Model is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      brand,
      model,
      engine,
      hp,
      fuel,
      year,
      description,
      photo
    } = req.body;

    const newVeh = {
      brand,
      model
    };

    if (engine) newVeh.engine = engine;
    if (hp) newVeh.hp = hp;
    if (fuel) newVeh.fuel = fuel;
    if (year) newVeh.year = year;
    if (description) newVeh.description = description;
    if (photo) newVeh.photo = photo;

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id, 'vehicle._id': req.params.veh_id },
        {
          $set: {
            'vehicle.$': { _id: req.params.veh_id, ...newVeh }
          }
        },
        { new: true }
      );

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// PUT api/profile/following
// Put a following user
// Private
router.put('/follow/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.params.id).select('-password');
    const profile = await Profile.findOne({ user: req.user.id });

    if (
      profile.following.filter(
        following => following.user.toString() === req.params.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: 'You have been alredy following this user' });
    }

    const newFollowing = {
      name: user.name,
      avatar: user.avatar,
      user: user.id
    };

    profile.following.unshift(newFollowing);

    await profile.save();

    const profile2 = await Profile.findOne({
      user: req.params.id
    }).populate('user', ['name', 'avatar']);

    res.json(profile2);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// PUT api/profile/unfollow
// Unfollow a user
// Private
router.put('/unFollow/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (
      profile.following.filter(
        following => following.user.toString() === req.params.id
      ).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'You have alredy unfollow this user' });
    }

    const removeIndex = profile.following
      .map(following => following.user.toString())
      .indexOf(req.params.id);

    profile.following.splice(removeIndex, 1);

    await profile.save();

    const profile2 = await Profile.findOne({
      user: req.params.id
    }).populate('user', ['name', 'avatar']);

    res.json(profile2);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
