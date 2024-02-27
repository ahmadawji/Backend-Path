const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes", (req, res, next) => {
  const person = req.query.person;
  let filteredQuotes = [];
  if (person) {
    filteredQuotes = quotes.filter((quote) => {
      return quote.person === person;
    });
    res.send({ quotes: [...filteredQuotes] });
  }
  res.send({ quotes: quotes });
});

app.get("/api/quotes/random", (req, res, next) => {
  res.send({ quote: getRandomElement(quotes) });
});

app.listen(PORT, () => {
  //The second argument is a callback function that will be called once the server is running and ready to receive responses.
  console.log(`Server is listening on port ${PORT}`);
});
