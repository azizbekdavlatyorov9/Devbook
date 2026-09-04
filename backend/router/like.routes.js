const { Router } = require("express")
const { Like } = require("../controller/like.controller");
const authorization = require("../middlewares/authorization");

const likeRouter = Router();

likeRouter.patch("/like/:id", authorization, Like);

module.exports = likeRouter;
