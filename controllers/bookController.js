function bookController(Book) {
  function post(req, res) {
    const book = new Book(req.body);

    if (!req.body.title) {
      res.status(400);
      return res.send("Title is required");
    }

    book.save();
    console.log(`Books ${book}`);
    // Separate the response status
    res.status(201);

    return res.json(book);
  }

  function get(req, res) {
    const query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }

      return res.json(books);
    });
  }

  return { post, get };
}

module.exports = bookController;
