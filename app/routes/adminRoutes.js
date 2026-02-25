const express = require("express");
const adminController = require("../controller/adminController");

const router = express.Router();
router.post("/admin/auth/login", adminController.signIn);
router.post("/admin/doctor/create", adminController.createDoctor);
router.get("/admin/doctor/list", adminController.doctorListData);
router.post("/admin/doctor/delete", adminController.doctorDelete);
router.post("/admin/doctor/update", adminController.doctorUpdate);
router.get("/admin/doctor/details/:id", adminController.doctorDetails);
router.post("/admin/doctor/department", adminController.departmentCreate);
router.put("/admin/doctor/appointment/:id", adminController.confirmAppointment);
router.put(
  "/admin/doctor/appointment/cancelld/:id",
  adminController.cancelledAppointment,
);
router.get("/admin/doctor/appointment/list", adminController.appointMentList);

router.get(
  `/admin/departments/:departmentId/doctors`,
  adminController.departmentwiseDoctor,
);
module.exports = router;
