const Appointment = require("../models/Appointment");

const createAppointment = async (req, res, next) => {
    try {
        const {doctorId, date} = (req.body);
        const appointment = await Appointment.create({
            patientId: req.user.id,
            doctorId,
            date
        });
  
        await appointment.save();
  
  
      return res.status(201).json({
        message: "An Appointment Has Been Made",
        appointment
      });
    } catch (error) {
      next(error);
    }
  };

  const deleteAppointment = async (req, res, next) => {
    try {
      const appointmentId = req.params.id;

      await Appointment.findByIdAndDelete(appointmentId);
      res.status(200).json({ message: 'Randevu kaldırıldı.' });
    } catch (error) {
      next(error);
    }
  };
  const getAppointments = async (req, res, next) => {
    try {
        const patientId = req.user.id;
        const currentDate = new Date();

        const appointments = await Appointment.find({
            patientId,
            date: { $gte: currentDate } 
        })
        .populate({
          path: 'patientId', 
          select: 'name surname'
        })
        .populate({
            path: 'doctorId', 
            model: 'Doctor', 
            select: 'polyclinic', 
            populate: {
                path: 'userId',
                model: 'User', 
                select: 'name surname'
            }
        })
        .sort({ date: 1 });

        res.json(appointments);
    } catch (error) {
        next(error);
    }
};

const getPastAppointments = async (req, res, next) => {
  try {
      const patientId = req.user.id;
      const currentDate = new Date();

      const pastAppointments = await Appointment.find({
          patientId,
          date: { $lt: currentDate } 
      })
      .populate({
        path: 'patientId', 
        select: 'name surname'
      })
      .populate({
          path: 'doctorId', 
          model: 'Doctor', 
          select: 'polyclinic', 
          populate: {
              path: 'userId', 
              model: 'User', 
              select: 'name surname'
          }});

      res.json(pastAppointments);
  } catch (error) {
      next(error);
  }
};
const getDoctorAppointments = async (req, res, next) => {
  try {
    const doctorId = req.params.id;
    const requestedDate = req.body.date;
    const startDate = new Date(requestedDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(requestedDate);
    endDate.setHours(23, 59, 59, 999);
    const appointments = await Appointment.find({
      doctorId: doctorId,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    const appointmentTimes = appointments.map(appointment => {
      const appointmentDate = new Date(appointment.date);
      const hour = appointmentDate.getHours();
      const minute = appointmentDate.getMinutes();
      const formattedTime = `${hour < 10 ? "0"+hour : hour}:${minute.toString().padStart(2, '0')}`;
    
      return formattedTime;
    });
    

    res.status(200).json(appointmentTimes);
  } catch (error) {
    next(error);
  }
};






  module.exports = {
    createAppointment,
    deleteAppointment,
    getAppointments,
    getPastAppointments,
    getDoctorAppointments
  };
  