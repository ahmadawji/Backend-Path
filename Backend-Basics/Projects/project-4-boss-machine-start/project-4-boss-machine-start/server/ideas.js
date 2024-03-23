const express = require("express");
const ideas = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db.js");

const checkMillionDollarIdea = require("./checkMillionDollarIdea.js");

ideas.param("ideasId", (req, res, next, ideasId) => {
  // Perform some validation or data retrieval based on the userId
  if (getFromDatabaseById("ideas", ideasId)) {
    // If valid, attach the userId to the request object for later use
    req.ideaId = ideasId;
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(404).send("idea Not found!");
  }
});

ideas.get("/", (req, res, next) => {
  const ideas = getAllFromDatabase("ideas");
  res.send(ideas);
});

ideas.get("/:ideasId", (req, res, next) => {
  const idea = getFromDatabaseById("ideas", req.ideaId);
  res.send(idea);
});

ideas.post("/", checkMillionDollarIdea, (req, res, next) => {
  const ideaAdded = addToDatabase("ideas", req.body);
  res.status(201).send(ideaAdded);
});

ideas.put("/:ideasId", checkMillionDollarIdea, (req, res, next) => {
  const ideaUpdated = updateInstanceInDatabase("ideas", req.body);
  res.send(ideaUpdated);
});

ideas.delete("/:ideasId", (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId("ideas", req.ideaId);
  res.status(204).send(deletedIdea);
});
module.exports = ideas;
