const express = require("express");
const cors = require("cors");
const db = require("./config/db.config");
const passportConfig = require("./config/passport.config");

const PORT = 1234;

const app = express();

db();
passportConfig(app);

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const bookRouter = require("./routes/book.routes");
app.use("/api", bookRouter);

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
