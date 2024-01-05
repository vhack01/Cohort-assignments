const { Router } = require("express");
const { User, Course } = require("../db/index");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.create({ username, password, purchasedCourses: [] });
  res.status(200).json({ message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(403).json({
      message: "Invalid credentials",
    });
  }

  try {
    const token = jwt.sign({ username: username, type: "User" }, JWT_SECRET);
    res.status(200).json({
      token,
    });
  } catch (err) {
    return res.status(403).json({
      message: "Failed to Sign In",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.status(200).json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const username = req.headers.username;
  const courseId = req.params.courseId;
  try {
    await User.updateOne(
      { username },
      { $push: { purchasedCourses: courseId } }
    );
    res.status(200).json({ message: "Course purchased successfully" });
  } catch (err) {
    res.status(500).json({ ERROR: err });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  try {
    const user = await User.findOne({ username });
    const courses = await Course.find({
      _id: { $in: user.purchasedCourses },
    });
    return res.status(200).json({
      purchasedCourses: courses,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
});

module.exports = router;
