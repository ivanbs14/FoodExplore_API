const { Router } = require("express");
const DishController = require("../controllers/DishControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishRoutes = Router();
const dishController = new DishController();

dishRoutes.use(ensureAuthenticated);

dishRoutes.post("/", dishController.create);
dishRoutes.get("/", dishController.filters);
dishRoutes.get("/:id", dishController.previewDish);
dishRoutes.delete("/:id", dishController.delete);


module.exports = dishRoutes;