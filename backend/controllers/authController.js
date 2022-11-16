import Users from "../models/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    const user = await Users.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(400).json({ msg: "No account with this userName has been registered." });
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    if (password !== user.password) {
      return res.status(400).json({ msg: "Invalid password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: {
        userId: user._id,
        userName: user.userName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { authLogin };
