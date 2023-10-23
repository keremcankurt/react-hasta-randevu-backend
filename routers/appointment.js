const express = require("express");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { createAppointment, 
    deleteAppointment, 
    getAppointments, 
    getPastAppointments,
    getDoctorAppointments
 } = require("../controllers/appointment");


const router = express.Router();
router.post("/create",[getAccessToRoute],createAppointment);
router.delete("/:id", getAccessToRoute, deleteAppointment);
router.get("/", getAccessToRoute, getAppointments);
router.get("/pastappointments", getAccessToRoute, getPastAppointments);
router.post("/doctorappointments/:id", getAccessToRoute, getDoctorAppointments)


module.exports = router;
