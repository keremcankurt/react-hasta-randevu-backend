const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
  },
  date: {
    type: Date,
  },
  patientReport: {
    type: String,
  },
  prescription: {
    type: String,
  }
});
module.exports = mongoose.model("Appointment", AppointmentSchema);
