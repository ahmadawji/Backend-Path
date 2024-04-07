const express = require("express");
const envelopes = express.Router();
const envelopesData = require("../utils/data.js");
const Envelope = require("../models/envelope.js");
const envelopesDB = new Map();

envelopesData.forEach((envelope, index) => {
  envelopesDB.set(
    index + 1,
    new Envelope(index + 1, envelope.category, envelope.budget)
  );
});

envelopes.param("envelopeId", (req, res, next, envelopeId) => {
  // Perform some validation or data retrieval based on the userId
  if (envelopesDB.get(+envelopeId)) {
    // If valid, attach the userId to the request object for later use
    req.envelopeId = envelopeId;
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(404).send("envelope Not found!");
  }
});

envelopes.get("/", (req, res, next) => {
  const envelopes = Array.from(envelopesDB.keys()).map((key) => {
    const envelope = envelopesDB.get(key);
    return {
      id: envelope.ID,
      category: envelope.category,
      budget: envelope.budget,
    };
  });
  res.send(envelopes);
});

envelopes.get("/:envelopeId", (req, res, next) => {
  const envelope = getFromDatabaseById("envelopes", req.envelopeId);
  res.send(envelope);
});

envelopes.post("/", (req, res, next) => {
  const envelopeAdded = addToDatabase("envelopes", req.body);
  res.status(201).send(envelopeAdded);
});

envelopes.put("/:envelopeId", (req, res, next) => {
  const envelopeUpdated = updateInstanceInDatabase("envelopes", req.body);
  res.send(envelopeUpdated);
});

envelopes.delete("/:envelopeId", (req, res, next) => {
  const deletedenvelope = deleteFromDatabasebyId("envelopes", req.envelopeId);
  res.status(204).send(deletedenvelope);
});

module.exports = envelopes;
