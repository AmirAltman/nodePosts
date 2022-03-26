const mongoose = require("mongoose")
const createServer = require("../server")
const supertest = require('supertest');


const MONGO_URL="mongodb://localhost:27017/postsTest"



const app = createServer()
jest.setTimeout(30000);
describe('posts test suit', function () {
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

    const post1 = {title: "post 1", body: "test #1", creator: "system"}

    test("create new post", async function () {
        const {body, statusCode} =  await supertest(app).post("/posts").send(post1)
        expect(statusCode).toBe(200)
        const {success,post} = body
        expect(success).toBe(true)
        expect(post).toHaveProperty("title")
        expect(post.title).toBe(post1.title)
    })

    test("get posts list", async function () {
        const {body, statusCode} =  await supertest(app).get("/posts")
        expect(statusCode).toBe(200)
        const {success,posts} = body
        expect(success).toBe(true)
        expect(Array.isArray(posts)).toBeTruthy()
        expect(posts.length).toEqual(1)
        expect(posts[0].title).toBe(post1.title)
    })

    test("get posts number", async function () {
        const {body, statusCode} =  await supertest(app).get("/postnumber")
        expect(statusCode).toBe(200)
        const {success,postCount} = body
        expect(success).toBe(true)
        expect(postCount).toEqual(1)
    })
})