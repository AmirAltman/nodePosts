const express = require('express')
const routes = require('./routes/posts')


const app = express();
app.use(express.json());
app.use(routes);

app.listen(1337,()=>{
    console.log("server is listening on port 1337");
})


