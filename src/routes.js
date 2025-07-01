const express = require("express");
const enrollmentCtrl = require("./controllers/enrollmentController");
const reportCtrl = require("./controllers/reportController");
const courseCtrl = require("./controllers/courseController");
const router = express.Router();
// ثبت‌نام در دوره
router.post("/enroll", enrollmentCtrl.enrollStudent);
// گزارش حضور و غیاب یک دوره
router.get("/courses/:courseId/attendance-report", reportCtrl.attendanceReport);
router.get("/courses", courseCtrl.listCourses);
module.exports = router;
// …
