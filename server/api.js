const express = require("express");
const apiRouter = express.Router();
const envelopesRouter = require("../routes/envelopes");

apiRouter.use("/envelopes", envelopesRouter);

module.exports = apiRouter;
