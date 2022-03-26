const express = require('express')
const postRoutes = require('./routes/posts')
const statisticsRoutes = require('./routes/statistics')
const mongoose = require('mongoose');


const startServer = async ()=>{
    let mongoURL='mongodb://localhost:27017/posts';
    if(process.argv.length ===3)
        mongoURL= process.argv[2]
    try{
        await mongoose.connect(mongoURL,{useNewUrlParser: true})
        console.log("connected to db successfully");
        const app = express();
        app.use(express.json());
        app.use(postRoutes);
        app.use('/statistics',statisticsRoutes);

        app.listen(1337,()=>{
            console.log("server is listening on port 1337");
        })
    }
    catch (e) {
        console.log("server failed with error ",e.message);
    }
}

startServer()






