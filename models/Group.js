const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    status: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    adminname: {
        type: String
    },
    adminavatar: {
        type: String
    }
});

module.exports = Group = mongoose.model('group', GroupSchema);