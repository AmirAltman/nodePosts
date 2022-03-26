const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Missing mandatory field']
    },
    body: {
        type: String,
        required: [true, 'Missing mandatory field']
    },
    creator: {
        type: String,
        required: [true, 'Missing mandatory field']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema)