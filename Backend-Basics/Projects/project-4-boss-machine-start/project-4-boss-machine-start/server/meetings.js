const express = require("express");
const meetings = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  deleteAllFromDatabase,
} = require("./db.js");

meetings.get("/", (req, res, next) => {
  const meetings = getAllFromDatabase("meetings");
  res.send(meetings);
});

meetings.post("/", (req, res, next) => {
  const meetingCreated = createMeeting();
  res.send(meetingCreated);
});

meetings.delete("/", (req, res, next) => {
  const deletedMeeetings = deleteAllFromDatabase("meetings");
  res.send(deletedMeeetings);
});
module.exports = meetings;
