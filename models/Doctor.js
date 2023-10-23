const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  polyclinic: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Doctor", DoctorSchema);
