const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

AdminSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("admin", AdminSchema);