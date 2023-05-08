const mongoose = require("mongoose");

const dbConnect = () => {
  const db_uri = process.env.DB_URI;
  mongoose.set("strictQuery", false);
  mongoose.connect(
    db_uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if (!err) {
        console.log("Connected to db");
      } else {
        console.log("Unabled to connect to db");
      }
    }
  );
};

module.exports = dbConnect;
