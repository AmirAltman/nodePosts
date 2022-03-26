const express = require('express')
const routes = require('./routes/posts')
const mongoose = require('mongoose');


const startServer = async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/posts',{useNewUrlParser: true})
        console.log("connected to db successfully");
        const app = express();
        app.use(express.json());
        app.use(routes);

        app.listen(1337,()=>{
            console.log("server is listening on port 1337");
        })
    }
    catch (e) {
        console.log("server failed with error ",e.message);
    }
}

startServer()






