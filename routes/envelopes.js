const express = require("express");
const envelopes = express.Router();
const envelopesData = require("../utils/data.js");
const Envelope = require("../models/envelope.js");
const envelopesDB = [];

envelopesData.forEach((envelope, index) => {
  envelopesDB.push(new Envelope(index + 1, envelope.category, envelope.budget));
});

const checkEnvelopeIfFound = (ID) => {
  const envelopeFound = envelopesDB.find((envelope) => {
    return envelope.ID === +ID;
  });
  if (envelopeFound) return true;
  return false;
};

envelopes.param("envelopeId", (req, res, next, envelopeId) => {
  if (checkEnvelopeIfFound(envelopeId)) {
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
    typeof envelopeBody.budget === "number" &&
    envelopeBody.budget >= 0
  ) {
    req.body = envelopeBody;
    next();
  } else {
    res.status(400).json({
      error: {
        message: "Invalid Request Body",
        details:
          "Please provide 'category' and 'budget' fields in the request body.",
        example: {
          category: "string",
          budget: "number (greater than 0)",
        },
      },
    });
  }
};

const validateTransfer = (req, res, next) => {
  const envelopeReqBody = req.body;
  const envelopeKeys = Object.keys(envelopeReqBody);
  const budgetIndex = envelopeKeys.indexOf("budget");
  const firstEnvelopeId = +req.params.firstEnvelopeId;
  const secondEnvelopeId = +req.params.secondEnvelopeId;
  const firstEnvelope = envelopesDB.find((env) => env.ID === firstEnvelopeId);

  if (
    checkEnvelopeIfFound(firstEnvelopeId) &&
    checkEnvelopeIfFound(secondEnvelopeId) &&
    envelopeKeys.length === 1 &&
    budgetIndex !== -1 &&
    typeof envelopeReqBody.budget === "number" &&
    envelopeReqBody.budget >= 0 &&
    firstEnvelope.budget >= envelopeReqBody.budget
  ) {
    req.body = envelopeReqBody;
    next();
  } else {
    res.status(400).json({
      error: {
        message: "Invalid Request Body",
        details:
          "Please provide only 'budget' fields in the request body. Make sure that the envelope you're transferring from has a budget in the range of the value you're transferring.",
        example: {
          budget:
            "number (greater than 0 and less than the sender envelope's budget.)",
        },
      },
    });
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
  const envelopeReqBody = req.body;
  const envelopeUpdated =
    envelopesDB[envelopesDB.findIndex((env) => env.ID === req.envelopeId)];
  envelopeUpdated.category = envelopeReqBody.category;
  envelopeUpdated.budget = envelopeReqBody.budget;
  res.send(envelopeUpdated.envelopeObject());
});

envelopes.delete("/:envelopeId", (req, res, next) => {
  const envelopeIndex = envelopesDB.findIndex(
    (env) => env.ID === req.envelopeId
  );
  const deletedEnvelope = envelopesDB[envelopeIndex];

  envelopesDB.splice(envelopeIndex, 1);

  res.status(200).send(deletedEnvelope.envelopeObject());
});

envelopes.put(
  "/transfer/:firstEnvelopeId&:secondEnvelopeId",
  validateTransfer,
  (req, res, next) => {
    const budgetToBeAdded = req.body.budget;
    const firstEnvelopeId = req.params.firstEnvelopeId;
    const secondEnvelopeId = req.params.secondEnvelopeId;
    const firstEnvelope = envelopesDB.find(
      (env) => env.ID === +firstEnvelopeId
    );
    const secondEnvelope = envelopesDB.find(
      (env) => env.ID === +secondEnvelopeId
    );
    firstEnvelope.budget -= +budgetToBeAdded;
    secondEnvelope.budget += +budgetToBeAdded;
    res.json({
      sender: firstEnvelope.envelopeObject(),
      receiver: secondEnvelope.envelopeObject(),
    });
  }
);

module.exports = envelopes;
