const { Router } = require("express");
const { Register, Login, Verify, Logout, getProfile, forgotPassword, changePassword } = require("../controller/auth.controller");
const authValidateMiddleware = require("../middlewares/auth.validate.middleware");
const refreshToken = require("../middlewares/refresh-token");
const authorization = require("../middlewares/authorization");

const authRouter = Router();
authRouter.post("/register", authValidateMiddleware, Register);
authRouter.post("/verify", Verify);
authRouter.post("/login", Login);
authRouter.get("/refresh", refreshToken);
authRouter.get("/logout", Logout)
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/change-password", authorization, changePassword);
authRouter.get("/profile", authorization, getProfile )


module.exports = authRouter;
