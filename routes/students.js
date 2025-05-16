const express = require("express");
const router = express.Router();
const { Campus, Student } = require("../models");

// GET all students
router.get("/", async (req, res, next) => {
  try {
    const students = await Student.findAll({
      include: [Campus],
    });
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// GET single student
router.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [Campus],
    });
    if (!student) {
      res.status(404).send("Student not found");
    } else {
      res.json(student);
    }
  } catch (error) {
    next(error);
  }
});

// POST new student
router.post("/", async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
});

// PUT update student
router.put("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).send("Student not found");
    } else {
      await student.update(req.body);
      res.json(student);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE student
router.delete("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).send("Student not found");
    } else {
      await student.destroy();
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
