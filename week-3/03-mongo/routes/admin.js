const { Router } = require("express");
const { Admin, Course } = require("../db/index.js");
const router = Router();
const adminMiddleware = require("../middleware/admin");

// Admin Routes
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // checking if user already exist
  Admin.findOne({ username }).then(function (value) {
    if (value)
      return res.json({
        message: "Admin already exist.",
      });
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
