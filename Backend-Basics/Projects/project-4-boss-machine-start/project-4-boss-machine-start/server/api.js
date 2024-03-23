const express = require("express");
const apiRouter = express.Router();
const minionsRouter = require("./minions.js");
const meetingsRouter = require("./meetings.js");
const ideasRouter = require("./ideas.js");
const workRouter = require("./work.js");

//first argument is always a string representing the name of the database model: 'minions', 'ideas', 'meetings', or 'work'.
try {
  apiRouter.param("minionId", (req, res, next, minionId) => {
    req.minionId = minionId;
    next();
  });

  apiRouter.use("/minions", minionsRouter);
  apiRouter.use("/meetings", meetingsRouter);
  apiRouter.use("/ideas", ideasRouter);
  apiRouter.use("/minions/:minionId/work", workRouter);
} catch (error) {
  console.log(error);
}

module.exports = apiRouter;
