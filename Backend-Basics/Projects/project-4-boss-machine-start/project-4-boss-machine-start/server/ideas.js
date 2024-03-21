const express = require("express");
const ideas = express.Router();
const {
  createidea,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require("./db.js");

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

ideas.post("/", (req, res, next) => {
  const ideaAdded = addToDatabase("ideas", req.body);
  res.send(ideaAdded);
});

ideas.put("/:ideasId", (req, res, next) => {
  const ideaUpdated = updateInstanceInDatabase("ideas", req.body);
  res.send(ideaUpdated);
});

ideas.delete("/:ideasId", (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId("ideas", req.ideaId);
  res.send(deletedIdea);
});
module.exports = ideas;
