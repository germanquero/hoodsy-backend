const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorAddTexts = [
  check("texts").exists().isArray(),
  check("texts.*").exists().trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorEditPage = [
  check("location").exists().trim(),
  check("activity").exists().trim(),
  check("title").exists().trim(),
  check("summary").exists().trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorEditPage, validatorAddTexts };

// {
//     location: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     activity: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     summary: {
//       type: String,
//       trim: true,
//     },
//     texts: [
//       {
//         type: String,
//         trim: true,
//       },
//     ],
//     pictures: [
//       {
//         type: String,
//         trim: true,
//       },
//     ],
//     scoring: {
//       type: Number,
//       default: 0,
//     },
//     numReviews: {
//       type: Number,
//       default: 0,
//     },
//     reviews: [
//       {
//         user_id: {
//           type: String,
//           required: true,
//           trim: true,
//         },
//         score: {
//           type: Number,
//           required: true,
//         },
//         review: {
//           type: String,
//           trim: true,
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
