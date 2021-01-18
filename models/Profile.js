const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    interests: {
        type: [String],
        required: true
    },
    vehicle: [{
            brand: {
                type: String,
            },
            model: {
                type: String,
            },
            engine: {
                type: String
            },
            hp: {
                type: String
            },
            fuel: {
                type: String
            },
            year: {
                type: String
            },
            description: {
                type: String
            },
            photo: {
                type: String
            }
        }],
    social: {
        instagram: {
            type: String
        },
        facebook: {
            type: String
        },
        youtube: {
            type: String
        }
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);