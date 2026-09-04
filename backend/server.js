const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");
const authorRouter = require("./router/author.routes");
const BookRouter = require("./router/book.routes");
require("dotenv").config();
const errorMiddleware = require("./middlewares/error.middleware");
const authRouter = require("./router/auth.routes");
const app = express();
const cookieParser = require("cookie-parser");
const CitationRouter = require("./router/citation.routes");
const likeRouter = require("./router/like.routes");
const path = require("path");
const logger = require("./utils/logger");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173",
    credentials: true, }));
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

   
connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads/images")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(YAML.load("./docs/documentation.yml")));
// Router
app.use(authRouter);
app.use(authorRouter);
app.use(BookRouter);
app.use(CitationRouter);
app.use(likeRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running at: " + PORT);
});
