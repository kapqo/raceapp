const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// GET api/profile/me
// Get current users profile
// Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);
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
    [
        auth,
        [
            check('interests', 'Interests are required')
            .not()
            .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }

    const {
        user,
        location,
        bio,
        interests,
        brand,
        model,
        engine,
        hp,
        fuel,
        year,
        description,
        instagram,
        facebook,
        youtube
    } = req.body;  
    
    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(interests) {
        profileFields.interests = interests.split(',').map(interests => interests.trim());
    }

    //Build vehicle object
    profileFields.vehicle = {};
    if(brand) profileFields.vehicle.brand = brand;
    if(model) profileFields.vehicle.model = model;
    if(engine) profileFields.vehicle.engine = engine;
    if(hp) profileFields.vehicle.hp = hp;
    if(fuel) profileFields.vehicle.fuel = fuel;
    if(year) profileFields.vehicle.year = year;
    if(description) profileFields.vehicle.description = description;

    //Build social object
    profileFields.social = {};
    if(instagram) profileFields.social.instagram = instagram;
    if(facebook) profileFields.social.facebook = facebook;
    if(youtube) profileFields.social.youtube = youtube;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(profile){
            //Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });

            return res.json(profile);
        }

        //Create
        profile = new Profile(profileFields);
        
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

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
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile) return res.status(400).json({ msg: 'Profile not found'});

        res.json(profile);   
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found'});
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
        
        if(!profile) return res.status(400).json({ msg: 'Vehicle not found'});

        res.json(profile);   
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Vehicle not found'});
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

        res.json({msg: 'User removed'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// PUT api/profile/vehicle
// Add vehicles to profile
// Private
router.put('/vehicle', [auth, [
    check('brand', 'Brand is required').not().isEmpty(),
    check('model', 'Model is required').not().isEmpty(),
]], async (req ,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        brand,
        model,
        engine,
        hp,
        fuel,
        year,
        description  
    } = req.body;

    const newVeh = {
        brand,
        model,
        engine,
        hp,
        fuel,
        year,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        
        profile.vehicle.unshift(newVeh);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

// DELETE api/profile/vehicle/:veh_id
// Delete vehicle from profile
// Private
router.delete('/vehicle/:veh_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.vehicle.map(item => item.id).indexOf(req.params.veh_id);

        profile.vehicle.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

// PUT api/profile/vehicle
// Add vehicles to profile
// Private
router.put('/vehicle/:veh_id', [auth, [
    check('brand', 'Brand is required').not().isEmpty(),
    check('model', 'Model is required').not().isEmpty(),
]], async (req ,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        brand,
        model,
        engine,
        hp,
        fuel,
        year,
        description  
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

    try {
        const profile = await Profile.findOneAndUpdate(
          // note that I wrote 'userid' instead of 'user'
          { user: req.user.id, 'vehicle._id': req.params.veh_id },
          {
            $set: {
              // I don't want my experience id to change
              'vehicle.$': { _id: req.params.veh_id, ...newVeh }
            }
          },
          { new: true }
        );

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;