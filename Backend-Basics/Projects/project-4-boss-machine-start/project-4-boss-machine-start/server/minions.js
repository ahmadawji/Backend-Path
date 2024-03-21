const express = require("express");
const minions = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db.js");

minions.param("minionId", (req, res, next, minionId) => {
  // Perform some validation or data retrieval based on the userId
  if (getFromDatabaseById("minions", minionId)) {
    // If valid, attach the userId to the request object for later use
    req.minionId = minionId;
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(404).send("Minion Not found!");
  }
});

//validate data middlewares
const validateMinion = (req, res, next) => {
  /* Minion:
  id: string
  name: string
  title: string
  salary: number */
};

minions.get("/", (req, res, next) => {
  const minions = getAllFromDatabase("minions");
  res.send(minions);
});

minions.get("/:minionId", (req, res, next) => {
  const minion = getFromDatabaseById("minions", req.minionId);
  res.send(minion);
});

minions.post("/", (req, res, next) => {
  const minionAdded = addToDatabase("minions", req.body);
  res.send(minionAdded);
});

minions.put("/:minionId", (req, res, next) => {
  const minionUpdated = updateInstanceInDatabase("minions", req.body);
  res.send(minionUpdated);
});

minions.delete("/:minionId", (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId("minions", req.minionId);
  res.send(deletedMinion);
});

module.exports = minions;
