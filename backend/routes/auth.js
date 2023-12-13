const express = require("express");
const router = express.Router();
const User = require("../modals/UserModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

// create user
router.post("/register", async (req, res) => {
  let success = false;

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json(success + "user already exists, login instead");
  }
  const salt = await bcrypt.genSalt(10);
  const secretPswd = await bcrypt.hash(req.body.password, salt);

  try {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: secretPswd,
    });
    await newUser.save();

    const data = {
      user: {
        id: newUser.id,
      },
    };
    const authtoken = jwt.sign(data, process.env.jwtSecret);
    success = true;
    return res.status(200).json({ success, authtoken });
  } catch (error) {
    console.error(error);
  }
});

// login user
router.post("/login", async (req, res) => {
  let success = false;
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json(`${success} invalid email`);
    }
    let validpswd = await bcrypt.compare(password, user.password);
    if (!validpswd) {
      res.status(400).json({ success: " false", message: "invalid password" });
    }
    const data = {
      user: {
        id: user.id,
        name: user.name,
      },
    };
    const authtoken = jwt.sign(data, process.env.jwtSecret);
    success = true;
    return res.status(200).json({ success, authtoken, data });
  } catch (error) {
    console.error(error);
  }
});

// get logged in user details, login required

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    // let exuser = await User.findOne({ email: req.body.email });
    // if (!exuser) {
    //   res.status(400).json("invalid email");
    // }
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json(success, user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
