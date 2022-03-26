const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    actionType: {
        type: String,
        required: [true, 'Missing mandatory field']
    },
    runTime: {
        type: Number,
        required: [true, 'Missing mandatory field']
    },
})

module.exports = mongoose.model('Statistics', statisticsSchema)