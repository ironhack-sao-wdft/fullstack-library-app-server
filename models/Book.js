const { Schema, model } = require("mongoose");

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    // getYear retorna o ano atual menos 1900, por isso precisamos somar 1900 no resultado
    year: { type: Number, min: 1900, max: new Date().getYear() + 1900 },
    genre: {
      type: String,
      enum: ["Romance", "Poetry", "Biography", "Horror", "Sci-fi", "Fantasy"],
    },
    publisher: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    toJSON: {
      transform: (doc, returnDoc) => {
        delete returnDoc.__v;
        return returnDoc;
      },
    },
  }
);

const BookModel = model("Book", BookSchema);

module.exports = BookModel;
