const express = require("express");
const router = express.Router();
const Post = require("../models/post")
const Statistics = require("../models/statistics")

const PAGE_SIZE = 5;

const saveRunTime=(actionType,runTime)=>{
    try{
        const statistics = new Statistics({actionType,runTime});
        statistics.save();
    }
    catch (e) {
        console.log('failed to save run time',e.message);
    }
}

router.get("/posts", async (req, res) => {
    let startTimer = process.hrtime();
    const {page = 0} = req.query;
    const posts = await Post.find({}, null, {sort: {createdAt: -1}, limit: PAGE_SIZE, skip: (PAGE_SIZE * page)});
    res.send({success: true,posts});
    let timer = process.hrtime(startTimer)
    const runTime =(timer[0] * 1e9 + timer[1])/1e9
    saveRunTime('getPost',runTime)
});

router.post("/posts", async (req, res) => {
    let startTimer = process.hrtime();
    const {title, body, creator} = req.body;
    try {
        const post = new Post({title, body, creator});
        await post.save();
        res.send({success: true, post});
        let timer = process.hrtime(startTimer)
        const runTime =(timer[0] * 1e9 + timer[1])/1e9
        saveRunTime('postPost',runTime)
    } catch (e) {
        res.status(500).send({success: true, error: e.message});
        let timer = process.hrtime(startTimer)
        const runTime =(timer[0] * 1e9 + timer[1])/1e9
        saveRunTime('postPost',runTime)
    }
});

router.get('/postnumber', async (req, res) => {
    const postCount = await Post.count()
    res.send({success: true, postCount})
})

module.exports = router;