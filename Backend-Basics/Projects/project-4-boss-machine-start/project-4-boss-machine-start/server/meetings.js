const express = require("express");
const meetings = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  deleteAllFromDatabase,
  addToDatabase,
} = require("./db.js");

meetings.get("/", (req, res, next) => {
  const meetings = getAllFromDatabase("meetings");
  res.send(meetings);
});

meetings.post("/", (req, res, next) => {
  const meetingCreated = createMeeting();
  const addedMeetingToDB = addToDatabase("meetings", meetingCreated);
  res.status(201).send(addedMeetingToDB);
});

meetings.delete("/", (req, res, next) => {
  const deletedMeeetings = deleteAllFromDatabase("meetings");
  res.status(204).send(deletedMeeetings);
});
module.exports = meetings;
