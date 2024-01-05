const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const { JWT_SECRET } = require("../config");
const router = Router();
const { Admin, Course } = require("../db/index");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  // checking if user already exist
  const value = await Admin.findOne({ username });
  if (value)
    return res.status(403).json({
      message: "Admin already exist.",
    });

  // create new  admin
  Admin.create({ username, password })
    .then(function (value) {
      if (value) {
        return res.status(200).json({ message: "Admin created successfully" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: "Failed to create new admin" });
    });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + ", " + password);
  const isValid = await Admin.findOne({ username, password });
  if (!isValid) {
    return res.status(403).json({
      message: "Invalid credentials",
    });
  }

  try {
    const token = jwt.sign({ username: username, type: "Admin" }, JWT_SECRET);
    console.log(token);
    res.status(200).json({
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to Sing In",
      err,
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const course = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.imageLink,
  };
  try {
    const newCourse = await Course.create(course);
    console.log(newCourse);
    return res.status(200).json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create new Course",
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({});
  res.status(200).json({ courses });
});

module.exports = router;
