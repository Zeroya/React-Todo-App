import Users from "../models/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let refreshTokens = [];
const accessTokenLifetime = 10 * 10 * 100;
const refreshTokenLifetime = 60 * 60 * 24 * 1000;

const authRegister = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    const isUsed = await Users.findOne({ userName: req.body.userName });

    if (isUsed) {
      return res.status(300).json({ msg: "This account already exist." });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = new Users({ userName, password: hashedPassword });
    await user.save();

    return res.status(201).json({ msg: "New user registered." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const authLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    const user = await Users.findOne({ userName });
    if (!user) {
      return res.status(400).json({ msg: "No account with this userName has been registered." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });

    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      maxAge: accessTokenLifetime,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.cookie("refresh", refreshToken, {
      maxAge: refreshTokenLifetime,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    refreshTokens.push(refreshToken);

    return res.status(201).json({
      token,
      refreshToken,
      user: {
        userId: user._id,
        userName: user.userName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const tokenRefresh = (req, res) => {
  const refreshToken = req.cookies.refresh;

  if (!refreshToken) {
    return res.status(401).json(false);
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    err && console.log(err);
    const { userId } = user;

    const token = jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });

    res.cookie("jwt", token, {
      maxAge: accessTokenLifetime,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({ token });
  });
};

const isLoggedIn = async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json(false);
  }
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      res.clearCookie("jwt");
      return res.status(401).json(false);
    } else {
      return res.status(200).json(true);
    }
  });
};

const logout = (req, res) => {
  const refreshToken = req.cookies.refresh;
  res.clearCookie("refresh", { httpOnly: false, secure: true, sameSite: "none" });
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(204);
};

export { authLogin, authRegister, isLoggedIn, tokenRefresh, logout };
