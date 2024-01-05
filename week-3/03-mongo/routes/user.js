const { User, Course } = require("../db/index.js");
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = new User({ username, password, purchasedCourses: [] });
  user.save();
  res.status(200).json({ message: "User created successfully" });
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
  const user = await User.findOne({ username });
  console.log(user);
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.status(200).json({ purchasedCourses: courses });
});

module.exports = router;
