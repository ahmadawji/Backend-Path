const express = require("express");
const work = express.Router({ mergeParams: true });
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db.js");

work.param("workId", (req, res, next, workId) => {
  // Perform some validation or data retrieval based on the userId
  if (getFromDatabaseById("work", workId)) {
    req.workId = workId;
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(404).send("work Not found!");
  }
});

work.use((req, res, next) => {
  const minion = getFromDatabaseById("minions", req.minionId);
  if (minion) {
    req.minion = minion;
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(404).send("Minion Not found!");
  }
});

const checkWorkBelongsToMinion = (req, res, next) => {
  const minion = req.minion;
  const work = getFromDatabaseById("work", req.workId);
  if (work.minionId !== minion.id) res.status(400).send();
  else next();
};

work.get("/", (req, res, next) => {
  let work = getAllFromDatabase("work");
  work = work.filter((work) => work.minionId === req.minionId);
  res.send(work);
});

work.get("/:workId", (req, res, next) => {
  const work = getFromDatabaseById("work", req.workId);
  res.send(work);
});

work.post("/", (req, res, next) => {
  const workAdded = addToDatabase("work", req.body);
  res.status(201).send(workAdded);
});

work.put("/:workId", checkWorkBelongsToMinion, (req, res, next) => {
  const workUpdated = updateInstanceInDatabase("work", req.body);
  res.send(workUpdated);
});

work.delete("/:workId", (req, res, next) => {
  const deletedwork = deleteFromDatabasebyId("work", req.workId);
  res.status(204).send(deletedwork);
});

module.exports = work;
