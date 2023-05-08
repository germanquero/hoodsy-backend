const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleHttpError");
const { pageModel } = require("../models");
const fs = require("fs");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = __dirname + "/../storage";

const publishPage = async (req, res) => {
  try {
    const merchant = req.merchant;
    await pageModel.findByIdAndUpdate(merchant.page, { published: true });
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_PUBLISH_PAGE");
  }
};

const deletePage = async (req, res) => {
  try {
    const merchant = req.merchant;
    await pageModel.findByIdAndUpdate(merchant.page, { published: false });
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_DELETE_PAGE");
  }
};

const editPage = async (req, res) => {
  try {
    const body = matchedData(req);
    const merchant = req.merchant;
    await pageModel.findByIdAndUpdate(merchant.page, body);
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_EDIT_PAGE");
  }
};

const postPhoto = async (req, res) => {
  try {
    const merchant = req.merchant;
    const { file } = req;
    const url = PUBLIC_URL + "/webpages/photos/" + file.filename;
    const page = await pageModel.findById(merchant.page);
    const picturesArray = [...page.pictures, url];
    await pageModel.findByIdAndUpdate(merchant.page, {
      pictures: picturesArray,
    });
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_POST_PHOTO");
  }
};

const deletePhoto = async (req, res) => {
  try {
    const merchant = req.merchant;
    const filename = req.params.filename;
    const path = MEDIA_PATH + "/" + filename;
    fs.unlinkSync(path);
    const url = PUBLIC_URL + "/webpages/photos/" + filename;
    const page = await pageModel.findById(merchant.page);
    const picturesArray = page.pictures.filter(
      (pictureUrl) => pictureUrl !== url
    );
    await pageModel.findByIdAndUpdate(merchant.page, {
      pictures: picturesArray,
    });
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_DELETE_PHOTO");
  }
};

const postTexts = async (req, res) => {
  try {
    const merchant = req.merchant;
    const body = matchedData(req);
    const page = await pageModel.findById(merchant.page);
    const textsArray = [...page.texts, ...body.texts];
    await pageModel.findByIdAndUpdate(merchant.page, {
      texts: textsArray,
    });
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_POST_TEXTS");
  }
};

const deleteTexts = async (req, res) => {
  try {
    const merchant = req.merchant;
    const body = matchedData(req);
    const page = await pageModel.findById(merchant.page);
    const textsArray = page.texts.filter((text) => !body.texts.includes(text));
    await pageModel.findByIdAndUpdate(merchant.page, {
      texts: textsArray,
    });
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_DELETE_TEXTS");
  }
};

const getPages = async (req, res) => {
  try {
    const id = req.query.id;
    const city = req.query.city;
    const activity = req.query.activity;
    const scoring = req.query.scoring;
    const filter = {};
    filter.published = true;
    if (id) {
      filter._id = id;
    }
    if (city) {
      filter.city = city;
    }
    if (activity) {
      filter.activity = activity;
    }
    const query = pageModel.find(filter);
    if (scoring === "true") {
      query.sort({ scoring: -1 });
    }
    const pages = await query.exec();
    res.send(pages);
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_GET_PAGES");
  }
};

const getPicture = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = MEDIA_PATH + "/" + filename;
    res.set("Content-Type", "image/jpeg");
    res.set("Content-Disposition", "inline");
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (err) {
    handleHttpError(res, err, "ERROR_GET_PICTURE");
  }
};

const postReview = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const body = matchedData(req);
    const user_review = {
      user_id: user.id,
      score: body.score,
      review: body.review,
    };
    const page = await pageModel.findById(id);
    if(page.published == false){
      throw new Error("Not published");
    }
    let reviewsArray = page.reviews.filter(
      (review) => review.user_id != user.id
    );
    reviewsArray = [...reviewsArray, user_review];
    const numReviews = reviewsArray.length;
    let scoring = 0;
    reviewsArray.forEach((review)=> scoring+=review.score);
    scoring = scoring / numReviews;
    await pageModel.findByIdAndUpdate(id, { reviews: reviewsArray, scoring: scoring, numReviews: numReviews });
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_POST_REVIEW");
  }
};

const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const page = await pageModel.findById(id);
    if(page.published == false){
      throw new Error("Not published");
    }
    const reviewsArray = page.reviews.filter(
      (review) => review.user_id != user.id
    );
    const numReviews = reviewsArray.length;
    let scoring = 0;
    reviewsArray.forEach((review)=> scoring+=review.score);
    scoring = scoring / numReviews;
    await pageModel.findByIdAndUpdate(id, { reviews: reviewsArray, scoring: scoring, numReviews: numReviews });
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_DELETE_REVIEW");
  }
};

module.exports = {
  publishPage,
  deletePage,
  editPage,
  postPhoto,
  deletePhoto,
  postTexts,
  deleteTexts,
  getPages,
  getPicture,
  postReview,
  deleteReview,
};
