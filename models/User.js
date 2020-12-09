const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
