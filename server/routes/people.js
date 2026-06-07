const express = require("express");
const Person = require("../models/Person");
const {
  normalizePhone,
  timestamp,
  trimToNull,
  validatePerson,
  validateLocationUpdate
} = require("../middleware/validation");

const router = express.Router();

router.get("/people", async (req, res, next) => {
  try {
    const people = await Person.find().sort({ name: 1 });
    res.json(people);
  } catch (error) {
    next(error);
  }
});

router.post("/people", async (req, res, next) => {
  try {
    const validationError = await validatePerson(req.body);
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    const person = await Person.create({
      _id: trimToNull(req.body.id) || undefined,
      name: req.body.name.trim(),
      address: req.body.address.trim(),
      phone: normalizePhone(req.body.phone),
      gender: trimToNull(req.body.gender) || "",
      age: req.body.age === null || req.body.age === "" || req.body.age === undefined ? null : Number(req.body.age),
      married: false,
      divorced: false,
      single: true,
      spouseId: null,
      yrDivorced: null,
      history: Array.isArray(req.body.history) && req.body.history.length
        ? req.body.history.map(String)
        : [`Created record on ${timestamp()}`]
    });

    res.status(201).json(person);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "That person already exists in the tracker." });
      return;
    }
    next(error);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const validationError = validateLocationUpdate(req.body);
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    const name = req.body.name.trim();
    const person = await Person.findOneAndUpdate(
      { nameLower: name.toLowerCase() },
      {
        $set: {
          name,
          nameLower: name.toLowerCase(),
          lat: Number(req.body.lat),
          lng: Number(req.body.lng),
          updated: new Date()
        },
        $setOnInsert: {
          address: "",
          phone: "",
          gender: "",
          age: null,
          married: false,
          divorced: false,
          single: true,
          spouseId: null,
          yrDivorced: null,
          history: [`Created location record on ${timestamp()}`]
        }
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(person);
  } catch (error) {
    next(error);
  }
});

router.delete("/people", async (req, res, next) => {
  try {
    await Person.deleteMany({});
    res.json({ message: "Cleared all people." });
  } catch (error) {
    next(error);
  }
});

router.delete("/person/:name", async (req, res, next) => {
  try {
    const result = await Person.deleteOne({ nameLower: req.params.name.trim().toLowerCase() });
    if (!result.deletedCount) {
      res.status(404).json({ message: "Person not found." });
      return;
    }
    res.json({ message: "Deleted person." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
