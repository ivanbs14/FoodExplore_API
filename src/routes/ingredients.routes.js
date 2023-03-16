const { Router } = require("express");
const ingredientsControllers = require("../controllers/ingredientsControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ingredientsRoutes = Router();
const IngredientsControllers = new ingredientsControllers();

ingredientsRoutes.get("/", ensureAuthenticated, IngredientsControllers.index);

module.exports = ingredientsRoutes;