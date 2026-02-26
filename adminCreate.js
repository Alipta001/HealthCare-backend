const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminSchema = require("./app/model/adminUser");

mongoose.connect(
  `mongodb+srv://sagnikduttaimps_db_user:VXDnGjfED8Wdk0Fi@cluster0.re3qyum.mongodb.net/nilldatta`,
);

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new adminSchema({
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
