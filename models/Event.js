const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  description: {
    type: String
  },
  sure: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  unsure: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = Event = mongoose.model('event', EventSchema);
