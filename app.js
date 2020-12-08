const express = require("express");
const cors = require("cors");
const db = require("./config/db.config");
db();

const PORT = 1234;

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const bookRouter = require("./routes/book.routes");
app.use("/", bookRouter);

const userRouter = require('./routes/user.routes')
app.use('/', userRouter);


app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
