const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleHttpError");
const { pagesModel } = require("../models");
const fs = require("fs");

const MEDIA_PATH = __dirname + "/../storage";



const getPages = async (req, res) => {
  try {

    const id = req.query.id;
    const location = req.query.location;
    const activity = req.query.activity;
    const scoring = req.query.scoring;

    const filter = {};

    if (id) {
      filter._id = id;
    }

    if (location) {
      filter.location = location;
    }

    if (activity) {
      filter.activity = activity;
    }

    const query = pagesModel.find(filter);
    
    if (scoring === "true") {
      query.sort({ scoring: -1 });
    }

    const pages = await query.exec();

    res.send(pages);
  } catch (err) {
    handleHttpError(res, "ERROR_SEARCH_PAGES");
  }
};

const getPicture = async (req, res) => {
  try {
    const filename = matchedData(req).filename;
    const filePath = MEDIA_PATH + "/" + filename;
    res.set("Content-Type", "image/jpeg");
    res.set("Content-Disposition", "inline");
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_PICTURE");
  }
};

module.exports = { getPages, getPicture };
