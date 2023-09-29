const express = require("express");
const app = express();
const Joi = require("@hapi/joi");

app.use(express.json());

const fruits = [
  { name: "Apples", id: 1 },
  { name: "Bananas", id: 2 },
  { name: "Cherries", id: 3 },
  { name: "Dates", id: 4 },
  { name: "Grapes", id: 5 },
  { name: "Lemons", id: 6 },
  { name: "Melons", id: 7 },
];

app.get("/", (req, res) => {
  res.send("Join our mailing list for a free course");
});

app.get("/api/fruits", (req, res) => {
  res.send(fruits);
});

app.get("/api/fruits/:id", (req, res) => {
  const fruit = fruits.find((x) => x.id == parseInt(req.params.id));
  if (!fruit) res.status(404).send("fruit not found");
  res.send(fruit);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
