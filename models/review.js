const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    stars: {type: Number, min: 1, max: 5, default: 5},
    // Add the 3 new properties below
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema)