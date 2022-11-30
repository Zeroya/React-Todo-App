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

    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
    });

    return res.status(201).json({
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

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, secure: true });
  res.json({ message: "Cookie cleared" });
};

const isLoggedIn = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(500).json(false);
  }
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      res.clearCookie("jwt");
      return res.status(200).json(false);
    } else {
      return res.status(200).json(true);
    }
  });
};

export { authLogin, isLoggedIn, logout };
