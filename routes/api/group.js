const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator')

const Group = require('../../models/Group');

// group api/group
// Create or update a group
// Private
router.post('/', [
    auth,
    [
    check('name', 'Name is required')
    .not()
    .isEmpty()
    ]
],
async (req, res) =>{
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
    }

    const { name, avatar, description, user, status, admin} = req.body;

    //Build group object
    const groupFields = {};

    if(name) groupFields.name = name;
    groupFields.avatar = avatar;
    if(description) groupFields.description = description;
    if(status) groupFields.status = status;
    if(admin) groupFields.admin = admin;

    try {
        let group = await Group.findOne({user: req.user.id})

        if(group){
            //Update
            group = await Group.findOneAndUpdate({ user: req.user.id }, { $set: groupFields }, { new: true });

            return res.json(group);
        }

        //Create
        group = new Group(groupFields);
        
        await group.save();
        res.json(group);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// GET api/group
// Get all groups
// Public
router.get(
    '/', async (req, res) => {
        try {
            const groups = await Group.find().populate('user', ['name', 'avatar']);
            res.json(groups);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');  
        }
    }
)

// GET api/group/:group_id
// Get group by group ID
// Public
router.get('/:group_id', async (req, res) => {
    try {
        const group = await Group.findOne({ _id: req.params.group_id }).populate('user', ['name', 'avatar']);

        if(!group) return res.status(400).json({ msg: 'Group not found'});

        res.json(group);   
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Group not found'});
        }
        res.status(500).send('Server Error');
    }
});

// DELETE api/group/:group_id
// Delete group by group ID
// Private
router.delete('/:group_id', auth, async (req, res) => {
    try {
        await Group.findOneAndRemove({ _id: req.params.group_id });

        res.json({msg: 'Group removed'});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// PUT api/group/members
// Add vehicles to profile
// Private
router.put('/members', auth, async (req ,res) => {


    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        id
    } = req.body;

    const newMem = {
        id
    }

    try {
        const group = await Group.findOne({user: req.user.id})
        
        group.members.unshift(newMem);

        await group.save();

        res.json(group);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})


module.exports = router;