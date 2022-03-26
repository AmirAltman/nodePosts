const express = require("express");
const router = express.Router();
const Post = require("../models/post")

const PAGE_SIZE = 5;

router.get("/posts", async (req, res) => {
    const {page = 0} = req.query;
    const posts = await Post.find({}, null, {sort: {createdAt: -1}, limit: PAGE_SIZE, skip: (PAGE_SIZE * page)});
    res.send({success: true,posts});
});

router.post("/posts", async (req, res) => {
    const {title, body, creator} = req.body;
    try {
        const post = new Post({title, body, creator});
        await post.save();
        res.send({success: true, post});
    } catch (e) {
        res.status(500).send({success: true, error: e.message});
    }
});

router.get('/postnumber', async (req, res) => {
    const postCount = await Post.count()
    res.send({success: true, postCount})
})

module.exports = router;