const express = require("express");
const envelopes = express.Router();
const envelopesData = require("../utils/data.js");
const Envelope = require("../models/envelope.js");
const envelopesDB = [];

envelopesData.forEach((envelope, index) => {
  envelopesDB.push(new Envelope(index + 1, envelope.category, envelope.budget));
});

envelopes.param("envelopeId", (req, res, next, envelopeId) => {
  // Perform some validation or data retrieval based on the userId
  const envelopeFound = envelopesDB.find((envelope) => {
    return envelope.ID === +envelopeId;
  });

  if (envelopeFound) {
    // If valid, attach the userId to the request object for later use
    req.envelopeId = +envelopeId;
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(404).send("envelope Not found!");
  }
});

const validateEnvelopeBody = (req, res, next) => {
  const envelopeBody = req.body;
  const envelopeKeys = Object.keys(envelopeBody);
  const categoryIndex = envelopeKeys.indexOf("category");
  const budgetIndex = envelopeKeys.indexOf("budget");

  if (
    envelopeKeys.length === 2 &&
    categoryIndex != -1 &&
    budgetIndex != -1 &&
    typeof envelopeBody.category === "string" &&
    typeof envelopeBody.budget === "number"
  ) {
    req.body = envelopeBody;
    next();
  } else {
    res
      .status(400)
      .send(
        `Make sure you have provided a good request body. Request body should be similary to {"category": string, "budget": number}`
      );
  }
};

envelopes.get("/", (req, res, next) => {
  const envelopes = envelopesDB.map((envelope) => {
    return envelope.envelopeObject();
  });
  res.send(envelopes);
});

envelopes.get("/:envelopeId", (req, res, next) => {
  const envelope = envelopesDB.find(
    (envelope) => envelope.ID === req.envelopeId
  );

  res.send(envelope.envelopeObject());
});

envelopes.post("/", validateEnvelopeBody, (req, res, next) => {
  const envelope = req.body;
  const ID = envelopesDB[envelopesDB.length - 1].ID;
  envelopesDB.push(new Envelope(ID + 1, envelope.category, envelope.budget));
  const envelopeAdded = envelopesDB[envelopesDB.length - 1];
  res.status(201).send(envelopeAdded.envelopeObject());
});

envelopes.put("/:envelopeId", validateEnvelopeBody, (req, res, next) => {
  const envelopeUpdated = updateInstanceInDatabase("envelopes", req.body);
  res.send(envelopeUpdated);
});

envelopes.delete("/:envelopeId", (req, res, next) => {
  const deletedenvelope = deleteFromDatabasebyId("envelopes", req.envelopeId);
  res.status(204).send(deletedenvelope);
});

module.exports = envelopes;
