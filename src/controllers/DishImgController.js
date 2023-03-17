const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage")

class DishImgController {
    async update(request, response){
        const id_prato = 4;
        const user_id = request.user.id;
        const imgFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const user = await knex("dish").where({ user_id: user_id }).first();
        const id_pratos = await knex("dish").where({ id: id_prato }).first();

        if(id_pratos.img_dish) {
            await diskStorage.deleteFile(user.img_dish);
        }

        const filename = await diskStorage.saveFile(imgFilename);
        id_pratos.img_dish = filename;

        await knex("dish").update(id_pratos).where({ id: id_prato });

        return response.json(id_pratos);

    }
}

module.exports = DishImgController;