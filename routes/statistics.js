const express = require("express");
const router = express.Router();
const Post = require("../models/post")

router.get('/topcreators', async (req, res) => {
    const aggRes = await Post.aggregate([
        {"$group" : {_id:"$creator", count:{$sum:1}}},
        {'$sort':{count:-1}},
        {'$limit': 5}
    ]);
    const topCreators = aggRes.map(creator=>creator._id)
    res.send({success: true, topCreators})
})

router.get('/runtimes', async (req, res) => {
    // todo: Get the average run-time of the first 2 functions
    const runTimes = {}
    res.send({success: true, runTimes})
})


module.exports = router;