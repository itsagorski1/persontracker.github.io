const Person = require("../models/Person");

function normalizePhone(input) {
  return String(input || "").replace(/\D/g, "");
}

function trimToNull(input) {
  if (input === null || input === undefined) {
    return null;
  }
  const trimmed = String(input).trim();
  return trimmed ? trimmed : null;
}

function timestamp() {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-");
  const time = [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0")
  ].join(":");
  return `${date} ${time}`;
}

async function validatePerson(person) {
  if (!person) {
    return "Request body is required.";
  }
  if (!trimToNull(person.name)) {
    return "Name is required.";
  }
  if (!trimToNull(person.address)) {
    return "Address is required.";
  }

  const phone = normalizePhone(person.phone);
  if (!/^\d{10}$/.test(phone)) {
    return "Phone number must be exactly 10 digits.";
  }
  if (phone.slice(3, 6) === "555") {
    return "Phone number cannot use a 555 exchange.";
  }

  const existing = await Person.exists({ nameLower: person.name.trim().toLowerCase() });
  if (existing) {
    return "That person already exists in the tracker.";
  }

  return null;
}

function validateLocationUpdate(body) {
  if (!body) {
    return "Request body is required.";
  }
  if (!trimToNull(body.name)) {
    return "Name is required.";
  }
  if (!Number.isFinite(Number(body.lat)) || !Number.isFinite(Number(body.lng))) {
    return "Latitude and longitude must be valid numbers.";
  }
  return null;
}

function validateEducation(request) {
  if (!request) {
    return "Request body is required.";
  }
  if (!trimToNull(request.name)) {
    return "Education name is required.";
  }
  if (!trimToNull(request.address)) {
    return "Education address is required.";
  }
  if (!trimToNull(request.type)) {
    return "Education type is required.";
  }
  return null;
}

module.exports = {
  normalizePhone,
  timestamp,
  trimToNull,
  validateEducation,
  validateLocationUpdate,
  validatePerson
};
