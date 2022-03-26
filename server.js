const express = require("express")
const postRoutes = require('./routes/posts')
const statisticsRoutes = require('./routes/statistics')

function createServer() {
    const app = express();
    app.use(express.json());
    app.use(postRoutes);
    app.use('/statistics',statisticsRoutes);
    return app
}

module.exports = createServer