const app = require("express")();

app.get("/", (req, res) => {
  res.status(200).send();
});

app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === "validationError") res.status(400).json({ error: message });
  else res.status(500).json({ name, message, stack });
  next(err);
});

module.exports = app;
