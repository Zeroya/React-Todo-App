import Users from "../models/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let refreshTokens = [];

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

    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1m",
    });

    res.cookie("jwt", token, {
      maxAge: 10 * 10 * 100,
      // httpOnly: true,
      // secure: true,
      // sameSite: "none",
    });

    res.cookie("refresh", refreshToken, {
      maxAge: 60 * 100 * 10,
      // httpOnly: true,
      // secure: true,
      // sameSite: "none",
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
  const jwtToken = req.cookies.jwt;
  const refreshToken = req.cookies.refresh;

  if (!refreshToken) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid refresh token",
        },
      ],
    });
  }

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const { userId } = user;

    jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
      if (!err) {
        return res.json("token exist");
      }
    });

    const token = jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });

    res.cookie(
      "jwt",
      token
      // {
      //   // httpOnly: true,
      //   // secure: true,
      //   // sameSite: "none",
      // }
    );

    res.json({ token });
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
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

export { authLogin, isLoggedIn, tokenRefresh };
