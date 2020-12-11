require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db.config");
const passportConfig = require("./config/passport.config");

const app = express();

const publicPath = path.join(__dirname, "public");

app.use(express.json());
app.use(cors());
app.use(express.static(publicPath));

db();
passportConfig(app);

app.get("*", (req, res, next) => {
  const hostUrl = req.originalUrl;
  if (!hostUrl.includes("/api")) {
    console.log(hostUrl);
    return res.sendFile(path.join(publicPath, "index.html"));
  }
  return next();
});

const bookRouter = require("./routes/book.routes");
app.use("/api", bookRouter);

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
