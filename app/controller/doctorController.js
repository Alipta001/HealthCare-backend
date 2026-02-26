const appointmentValidate = require("../validators/appointmentvalidator");
const AppointmentSchema = require("../model/AppointmentModel");
const transporter = require("../config/emailConfig");
const userSchema = require("../model/authModel");

class DoctorControllerUser {

  async appointmentCreate(req, res) {

    try {

      /* Validate request */
      const { error, value } = appointmentValidate.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: false,
          message: error.details.map(d => d.message).join(", "),
        });
      }

      const { doctorId, date, time, status } = value;

      /* Get userId from JWT token */
      const userId = req.user.id;

      /* Check slot exists */
      const exist = await AppointmentSchema.findOne({
        doctorId,
        date,
        time,
      });

      if (exist) {
        return res.status(409).json({
          status: false,
          message: "This time slot is already booked.",
        });
      }

      /* Create appointment */
      const appointment = await AppointmentSchema.create({
        doctorId,
        userId,
        date,
        time,
        status,
      });

      /* Get user */
      const user = await userSchema.findById(userId);

      if (user && user.email) {

        await transporter.sendMail({
          from: `"Hospital Management" <yourgmail@gmail.com>`,
          to: user.email,
          subject: "Appointment Booking Pending",
          html: `
            <div style="font-family: Arial;">
              <h2 style="color:green;">Appointment Pending</h2>
              <p>Hello ${user.first_name}</p>
              <p>Your appointment is pending approval.</p>

              <p><b>Date:</b> ${date}</p>
              <p><b>Time:</b> ${time}</p>

              <br/>
              <p>Thank you</p>
            </div>
          `,
        });

      }

      /* Success */
      return res.status(200).json({
        status: true,
        data: appointment,
        message: "Appointment created successfully",
      });

    } catch (err) {

      console.error(err);

      return res.status(500).json({
        status: false,
        message: "Server error",
        error: err.message,
      });

    }

  }

}

module.exports = new DoctorControllerUser();