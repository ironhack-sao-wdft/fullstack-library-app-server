require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db.config");
const passportConfig = require("./config/passport.config");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

db();
passportConfig(app);

const bookRouter = require("./routes/book.routes");
app.use("/api", bookRouter);

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
