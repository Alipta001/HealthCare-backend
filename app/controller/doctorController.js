let appointmentValidate = require("../validators/appointmentvalidator");
let AppointmentSchema = require("../model/AppointmentModel");
class DoctorControllerUser {
  async apponintmentCreate(req, res) {
    try {
      let { error, value } = appointmentValidate.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details.map((d) => d.message).join(", "),
        });
      }

      let { doctorId, userId, date, time, status } = value;

      let exist = await AppointmentSchema.findOne({ doctorId, time });

      if (exist) {
        return res.status(401).json({
          status: false,
          message: "This time slot is already booked by another patient.",
        });
      }

      let data = await AppointmentSchema.create({
        doctorId,
        userId,
        date,
        time,
        status,
      });

      res.status(200).json({
        status: true,
        data: data,
        message: "Appointment created successfully!",
      });

      console.log(data,"jjj")
    } catch (err) {
      res.status(500).json({
        status:false,
        error:err.message,
        message: "Error creating appointment",
      });
    }
  }
}

module.exports = new DoctorControllerUser();
