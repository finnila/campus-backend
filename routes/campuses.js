const express = require("express");
const router = express.Router();
const { Campus, Student } = require("../models");

// GET all campuses
router.get("/", async (req, res, next) => {
  try {
    console.log("Fetching all campuses...");
    const campuses = await Campus.findAll({
      include: [Student],
    });
    console.log("Found campuses:", campuses);
    res.json(campuses);
  } catch (error) {
    console.error("Error fetching campuses:", error);
    next(error);
  }
});

// GET single campus
router.get("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id, {
      include: [Student],
    });
    if (!campus) {
      res.status(404).send("Campus not found");
    } else {
      res.json(campus);
    }
  } catch (error) {
    next(error);
  }
});

// POST new campus
router.post("/", async (req, res, next) => {
  try {
    const campus = await Campus.create(req.body);
    res.status(201).json(campus);
  } catch (error) {
    next(error);
  }
});

// PUT update campus
router.put("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      res.status(404).send("Campus not found");
    } else {
      await campus.update(req.body);
      res.json(campus);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE campus
router.delete("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      res.status(404).send("Campus not found");
    } else {
      await campus.destroy();
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
