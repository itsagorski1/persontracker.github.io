const express = require("express");
const { trimToNull, validateEducation } = require("../middleware/validation");

const router = express.Router();

router.post("/", (req, res) => {
  const validationError = validateEducation(req.body);
  if (validationError) {
    res.status(400).json({ message: validationError });
    return;
  }

  res.status(201).json({
    name: req.body.name.trim(),
    address: req.body.address.trim(),
    type: req.body.type.trim(),
    grades: trimToNull(req.body.grades),
    yearStarted: trimToNull(req.body.yearStarted),
    yearCompleted: trimToNull(req.body.yearCompleted),
    notes: trimToNull(req.body.notes)
  });
});

module.exports = router;
