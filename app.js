const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3000;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

const apiRouter = require("./server/api");
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
