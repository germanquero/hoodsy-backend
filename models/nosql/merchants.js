const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const MerchantsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cif: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    address: {
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
    page: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

MerchantsSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("merchants", MerchantsSchema);
