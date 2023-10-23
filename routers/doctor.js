const express = require("express");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const reportUpload = require("../middlewares/libraries/reportUpload");
const { 
    addReportandPrescription,
    getDoctors,
    getPatients
 } = require("../controllers/doctor");

const router = express.Router();
router.put("/addreportandprescription/:id",[getAccessToRoute,reportUpload.single("report")],addReportandPrescription);
router.get("/",getAccessToRoute,getDoctors);
router.get("/patients",getAccessToRoute,getPatients);
module.exports = router;
