const express = require("express");
const Person = require("../models/Person");
const { timestamp, trimToNull } = require("../middleware/validation");

const router = express.Router();

router.post("/marriages", async (req, res, next) => {
  try {
    const { person1Id, person2Id } = req.body || {};
    if (!person1Id || !person2Id) {
      res.status(400).json({ message: "Both people are required." });
      return;
    }
    if (person1Id === person2Id) {
      res.status(400).json({ message: "A person cannot marry themselves." });
      return;
    }

    const [person1, person2] = await Promise.all([
      Person.findById(person1Id),
      Person.findById(person2Id)
    ]);
    if (!person1 || !person2) {
      res.status(404).json({ message: "One of the selected people could not be found." });
      return;
    }
    if (person1.married || person2.married) {
      res.status(400).json({ message: "One of those people is already marked as married." });
      return;
    }

    person1.married = true;
    person2.married = true;
    person1.divorced = false;
    person2.divorced = false;
    person1.single = false;
    person2.single = false;
    person1.spouseId = person2.id;
    person2.spouseId = person1.id;
    person1.yrDivorced = null;
    person2.yrDivorced = null;
    person1.history.push(`Married ${person2.name} on ${timestamp()}`);
    person2.history.push(`Married ${person1.name} on ${timestamp()}`);

    await Promise.all([person1.save(), person2.save()]);
    res.json({ message: `${person1.name} and ${person2.name} are now marked as married.` });
  } catch (error) {
    next(error);
  }
});

router.post("/divorces", async (req, res, next) => {
  try {
    const { person1Id, person2Id } = req.body || {};
    const year = trimToNull(req.body?.year);
    if (!person1Id || !person2Id || !year) {
      res.status(400).json({ message: "Two people and a divorce year are required." });
      return;
    }
    if (person1Id === person2Id) {
      res.status(400).json({ message: "Choose two different people." });
      return;
    }

    const [person1, person2] = await Promise.all([
      Person.findById(person1Id),
      Person.findById(person2Id)
    ]);
    if (!person1 || !person2) {
      res.status(404).json({ message: "One of the selected people could not be found." });
      return;
    }

    const linkedMarriage = person1.spouseId === person2.id && person2.spouseId === person1.id;
    if (!linkedMarriage) {
      res.status(400).json({ message: "Those two people are not currently linked as spouses." });
      return;
    }

    person1.divorced = true;
    person2.divorced = true;
    person1.married = false;
    person2.married = false;
    person1.single = true;
    person2.single = true;
    person1.yrDivorced = year;
    person2.yrDivorced = year;
    person1.history.push(`Divorced ${person2.name} in ${year}`);
    person2.history.push(`Divorced ${person1.name} in ${year}`);
    person1.spouseId = null;
    person2.spouseId = null;

    await Promise.all([person1.save(), person2.save()]);
    res.json({ message: `${person1.name} and ${person2.name} are now marked as divorced.` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
