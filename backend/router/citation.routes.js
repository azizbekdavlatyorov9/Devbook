const { Router } = require("express");
const adminChecker = require("../middlewares/admin-checker");
const { updateCitation, deleteCitation, addCitation } = require("../controller/citation.controller");

const CitationRouter = Router();


CitationRouter.post("/add_citation", adminChecker, addCitation);
CitationRouter.put("/update_citation/:id", adminChecker, updateCitation);
CitationRouter.delete("/delete_citation/:id", adminChecker, deleteCitation);


module.exports = CitationRouter;
