const express = require("express");
const router = express.Router();


router.get("/posts", async (req, res) => {
    const {page=0} = req.query;
    //todo: Get posts list by their creation order.. one chunk per call
    res.send({success: true});
});

router.post("/posts", async (req, res) => {
    const {title,body,creator} = req.body;
    try{
        // todo: save post
        res.send({success: true, title});
    }
    catch (e) {
        res.status(500).send({success: true,error:e.message});
    }
});

router.get('/postnumber', async (req,res)=>{
    // todo: Get the total posts number
    const postCount = 123
    res.send({success: true,postCount})
})

router.get('/topcreators', async (req,res)=>{
   // todo: Get the top 10 of post creators
    const topCreators = ['users']
    res.send({success: true, topCreators})
})

router.get('/runtimes', async (req,res)=>{
    // todo: Get the average run-time of the first 2 functions
    const runTimes = {}
    res.send({success: true,runTimes})
})

module.exports = router;