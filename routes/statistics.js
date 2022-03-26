const express = require("express");
const router = express.Router();

router.get('/topcreators', async (req, res) => {
    // todo: Get the top 10 of post creators
    const topCreators = ['users']
    res.send({success: true, topCreators})
})

router.get('/runtimes', async (req, res) => {
    // todo: Get the average run-time of the first 2 functions
    const runTimes = {}
    res.send({success: true, runTimes})
})


module.exports = router;