const router = require("express").Router();
const passport = require("passport");
const Book = require("../models/Book");
const User = require("../models/User");

// Crud (CREATE): POST
router.post(
  "/book",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      req.body.userId = req.user._id;
      const result = await Book.create(req.body);
      const userResult = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { books: result._id } },
        { new: true }
      );

      return res.status(201).json({ result, userResult });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

// cRud (READ): GET List
router.get("/book", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// cRud (READ): GET Detail
router.get(
  "/book/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const book = await Book.findOne({ _id: id });

      if (book) {
        return res.status(200).json(book);
      }

      return res.status(404).json({ msg: "Book not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

// crUd (UPDATE): PUT (destructive)
router.put(
  "/book/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const book = await Book.findOneAndReplace({ _id: id }, req.body, {
        new: true,
      });

      if (book) {
        return res.status(200).json(book);
      }

      return res.status(404).json({ msg: "Book not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

// crUd (UPDATE): PATCH (non-destructive)
router.patch(
  "/book/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const book = await Book.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      if (book) {
        return res.status(200).json(book);
      }

      return res.status(404).json({ msg: "Book not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

// cruD (DELETE): DELETE
router.delete(
  "/book/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const book = await Book.deleteOne({ _id: id });

      return res.status(200).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

module.exports = router;
