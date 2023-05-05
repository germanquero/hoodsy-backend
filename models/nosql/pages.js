const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const pageSchema = new mongoose.Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    activity: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    texts: [
      {
        type: String,
        trim: true,
      },
    ],
    pictures: [
      {
        type: String,
        trim: true,
      },
    ],
    scoring: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user_id: {
          type: String,
          required: true,
          trim: true,
        },
        score: {
          type: Number,
          required: true,
        },
        review: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

pageSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("page", pageSchema);
