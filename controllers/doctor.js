const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

const addReportandPrescription = (async (req, res, next) => {
    try {
      const prescription = (req.body?.prescription);
      const appointmentId = req.params.id;
      const savedReport = req.savedReport;
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        {
          $set: {
            patientReport: savedReport,
            prescription: prescription,
          },
        },
        { new: true }
      ).populate({
        path: 'patientId', 
        select: 'name surname'
      })
  
      if (!updatedAppointment) {
        return res.status(404).json({ message: "Randevu bulunamadı." });
      }
  
      res.status(200).json({
        message: "Rapor ve reçete başarıyla eklendi",
        updatedAppointment,
      });
    } catch (err) {
      console.log(err)
      next(err);
    }
  });
  const getDoctors = async (req, res, next) => {
    try {
      const doctors = await Doctor.find().populate('userId', 'name surname');
  
      res.status(200).json(doctors);
    } catch (err) {
      next(err);
    }
  };

  const getPatients = async (req, res, next) => {
    try {
      const id = req.user.id;
      const doctor = await Doctor.findOne({userId: id})
      console.log(doctor._id)
      const appointments = await Appointment.find({
        doctorId: doctor._id
      }).populate({
        path: 'patientId', 
        select: 'name surname'
      })
      
  
      res.status(200).json(appointments);
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    addReportandPrescription,
    getDoctors,
    getPatients
  };
  
  