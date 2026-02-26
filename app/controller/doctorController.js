let appointmentValidate = require("../validators/appointmentvalidator");
let AppointmentSchema = require("../model/AppointmentModel");
let transporter = require("../config/emailConfig");
const userSchema = require("../model/authModel");

class DoctorControllerUser {

  async appointmentCreate(req, res) {  // ✅ FIXED spelling

    try {

      let { error, value } = appointmentValidate.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details.map((d) => d.message).join(", "),
        });
      }

      let { doctorId, userId, date, time, status } = value;

      let exist = await AppointmentSchema.findOne({ time });

      if (exist) {
        return res.status(401).json({
          status: false,
          message: "This time slot is already booked.",
        });
      }

      let data = await AppointmentSchema.create({
        doctorId,
        userId,
        date,
        time,
        status,
      });

      let user = await userSchema.findById(userId);

      await transporter.sendMail({
        from: `"Hospital Management" <yourgmail@gmail.com>`,
        to: user.email,
        subject: "Appointment Booking Pending",
        html: `
          <h2>Appointment Pending</h2>
          <p>Date: ${date}</p>
          <p>Time: ${time}</p>
        `,
      });

      res.status(200).json({
        status: true,
        data: data,
        message: "Appointment created successfully!",
      });

    } catch (err) {

      res.status(500).json({
        status: false,
        message: err.message,
      });

    }

  }

}

module.exports = new DoctorControllerUser();