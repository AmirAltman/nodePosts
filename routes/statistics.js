const express = require("express");
const router = express.Router();
const Post = require("../models/post")
const Statistics = require("../models/statistics")

router.get('/topcreators', async (req, res) => {
    const aggRes = await Post.aggregate([
        {"$group" : {_id:"$creator", count:{$sum:1}}},
        {'$sort':{count:-1}},
        {'$limit': 10}
    ]);
    const topCreators = aggRes.map(creator=>creator._id)
    res.send({success: true, topCreators})
})

router.get('/runtimes', async (req, res) => {
    const runTimes = await Statistics.aggregate([
        {"$group" : {_id:"$actionType", avgRunTime:{$avg:"$runTime"}}},
    ]);
    res.send({success: true, runTimes})
})


module.exports = router;