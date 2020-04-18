require("should");

const request = require("supertest");
const mongoose = require("mongoose");

process.env.ENV = "Test";

const app = require("../app.js");

const Book = mongoose.model("book");

const agent = request.agent(app);

describe("Book CRUD Test", () => {
  it("Should allow a book to be posted and return read and _it", (done) => {
    const bookPost = { title: "My Book", genre: "Fiction", author: "Jon" };

    agent
      .post("/api/books")
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.read.should.equal(false);
        results.body.should.have.property("_id");
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    app.server.close(done());
    //mongoose.connection.close();
  });
});
