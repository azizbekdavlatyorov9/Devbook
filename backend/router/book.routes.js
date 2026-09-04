const { Router } = require("express");
const {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
  search,
} = require("../controller/book.controller");
const bookValidateMiddleware = require("../middlewares/book.validate.middleware");
const authorization = require("../middlewares/authorization");
const adminChecker = require("../middlewares/admin-checker");

const BookRouter = Router();

BookRouter.get("/get_all_books", authorization, getAllBooks);
BookRouter.get("/get_one_book/:id", authorization, getOneBook);
BookRouter.get("/book_search", authorization, search);
BookRouter.post("/add_book", adminChecker, bookValidateMiddleware, addBook);
BookRouter.put("/update_book/:id", adminChecker, updateBook);
BookRouter.delete("/delete_book/:id", adminChecker, deleteBook);

module.exports = BookRouter;
