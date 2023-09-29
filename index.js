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

function validateFruit(fruit) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(fruit);
}

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

//Create a new request
app.post("/api/fruits", (req, res) => {
  const { error } = validateFruit(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const fruit = {
    id: fruits.length + 1,
    name: req.body.name,
  };

  fruits.push(fruit);
  res.send(fruit);
});

//Update request handler
app.put("/api/fruits/:id", (req, res) => {
  const fruit = fruits.find((x) => x.id == parseInt(req.params.id));
  if (!fruit) res.status(404).send("fruit not found");

  const { error } = validateFruit(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  fruit.name = req.body.name;
  res.status(200).send(fruit);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
