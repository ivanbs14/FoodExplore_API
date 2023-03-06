const { Router } = require("express");
const ingredientsControllers = require("../controllers/ingredientsControllers");

const ingredientsRoutes = Router();
const IngredientsControllers = new ingredientsControllers();

ingredientsRoutes.get("/:user_id", IngredientsControllers.index);

module.exports = ingredientsRoutes;