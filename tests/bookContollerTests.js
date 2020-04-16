const should = require("should");
const sinon = require("sinon");
const bookContoller = require("../controllers/bookController");

describe("Book contoller Tests:", () => {
  describe("Post", () => {
    it("Should not allow an empty title on post", () => {
      // Declaring the book object
      const Book = function (book) {
        this.save = () => {};
      };

      const req = {
        body: {
          author: "Venkat",
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = bookContoller(Book);
      controller.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith("Title is required").should.equal(true);
    });
  });
});
