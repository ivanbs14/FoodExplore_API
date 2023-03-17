const { Router, response } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishController = require("../controllers/DishControllers");
const DishImgController = require("../controllers/DishImgController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishController = new DishController();
const dishImgController = new DishImgController();

dishRoutes.use(ensureAuthenticated);

dishRoutes.post("/", dishController.create);
dishRoutes.get("/", dishController.filters);
dishRoutes.get("/:id", dishController.previewDish);
dishRoutes.delete("/:id", dishController.delete);
dishRoutes.patch("/imgdish", ensureAuthenticated, upload.single("imgdish"), dishImgController.update);


module.exports = dishRoutes;