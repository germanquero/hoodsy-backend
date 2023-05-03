const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    city: {
      type: String,
    },
    allowsReceivingOffers: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UsersSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UsersSchema);
