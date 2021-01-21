const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    description: {
        type: String
    },
    members: [{
        id: {
            type: String
        }
    }],
    status: {
        type: String
    },
    admin: {
        type: String
    }
});

module.exports = Group = mongoose.model('group', GroupSchema);