const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const CustomError = require("../../helpers/error/CustomError");

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, "public/reports"));
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    req.savedReport = "report_" + req.params.id + "." + extension;
    cb(null, req.savedReport);
  },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new CustomError("Lütfen geçerli bir PDF dosyası ekleyin", 400), false);
    }
    return cb(null, true);
  };
  
const reportUpload = multer({ storage, fileFilter });

module.exports = reportUpload;
