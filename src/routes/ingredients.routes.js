const { Router } = require("express");
const IngredientsControllers = require("../controllers/ingredientsControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ingredientsRoutes = Router();
const ingredientsControllers = new IngredientsControllers();

ingredientsRoutes.get("/", ensureAuthenticated, ingredientsControllers.index);

module.exports = ingredientsRoutes;