const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishRouter = require("./dish.routes");
const ingredientsRouter = require("./ingredients.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dish", dishRouter);
routes.use("/ingredients", ingredientsRouter);

module.exports = routes;