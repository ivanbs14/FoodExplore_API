const { Router } = require("express");
const DishController = require("../controllers/DishControllers");

const dishRoutes = Router();
const dishController = new DishController();

dishRoutes.get("/", dishController.filters);
dishRoutes.post("/:user_id", dishController.create);
dishRoutes.get("/:id", dishController.previewDish);
dishRoutes.delete("/:id", dishController.delete);


module.exports = dishRoutes;