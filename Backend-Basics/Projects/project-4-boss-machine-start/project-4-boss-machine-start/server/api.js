const express = require("express");
const apiRouter = express.Router();
const minionsRouter = require("./minions.js");
const meetingsRouter = require("./meetings.js");
const ideasRouter = require("./ideas.js");

//first argument is always a string representing the name of the database model: 'minions', 'ideas', 'meetings', or 'work'.
try {
  apiRouter.use("/minions", minionsRouter);
  apiRouter.use("/meetings", meetingsRouter);
  apiRouter.use("/ideas", ideasRouter);
} catch (error) {
  console.log(error);
}

module.exports = apiRouter;
