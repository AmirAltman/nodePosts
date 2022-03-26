const mongoose = require("mongoose")
const createServer = require("../server")
const supertest = require('supertest');


const MONGO_URL="mongodb://localhost:27017/postsTest"


const app = createServer()
jest.setTimeout(30000);
describe('statistics test suit',  function () {
    beforeAll((done) => {
        mongoose.connect(
            MONGO_URL,
            {useNewUrlParser: true},
            () => done()
        )
    })

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => done())
        })
    })

    test("get run times", async function () {
        const post1 = {title: "post 1", body: "test #1", creator: "system"}
        await supertest(app).post("/posts").send(post1)
        await supertest(app).get("/posts")
        const {body, statusCode} =  await supertest(app).get("/statistics/runtimes")
        expect(statusCode).toBe(200)
        const {success,runTimes} = body
        expect(success).toBe(true)
        expect(Array.isArray(runTimes)).toBeTruthy()
        expect(runTimes.length).toEqual(2)
    })
    test("get top creators", async function () {
        const {body, statusCode} =  await supertest(app).get("/statistics/topcreators")
        expect(statusCode).toBe(200)
        const {success,topCreators} = body
        expect(success).toBe(true)
        expect(Array.isArray(topCreators)).toBeTruthy()
        expect(topCreators.length).toEqual(1)
    })
})