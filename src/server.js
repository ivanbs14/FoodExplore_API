const express = require("express");
const migrationsRun = require("./database/sqlite/migrations");
const routes = require("./routes");

const app = express();
app.use(express.json());

migrationsRun();

app.use(routes);

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running ${PORT}`));