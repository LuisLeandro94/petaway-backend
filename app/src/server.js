const app = require("./app");
const db = require("./models");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen({ port: PORT }, () => {
  console.log("API is running in port " + PORT);

  db.sequelize
    .authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error: " + err));
});
