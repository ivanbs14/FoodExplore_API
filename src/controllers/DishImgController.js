const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage")

class DishImgController {
    async create(request, response){
        const { id } = request.params;
        const img = request.file.filename;

        const diskStorage = new DiskStorage();
        const fileDisk = await diskStorage.saveFile(img);

        const dish = await knex("dish").where({ id: id }).update({ img_dish: img });

        return response.json({ name: dish.img });
    };

    /* async update(request, response){
        const id_prato = 28;
        const user_id = request.user.id;
        const imgFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const user = await knex("dish").where({ user_id: user_id }).first();
        const id_pratos = await knex("dish").where({ id: id_prato }).first();

        if(id_pratos.img_dish) {
            await diskStorage.deleteFile(id_prato.img_dish);
        }

        const filename = await diskStorage.saveFile(imgFilename);
        id_pratos.img_dish = filename;

        await knex("dish").update(id_pratos).where({ id: id_prato });

        return response.json(id_pratos);

    } */
}

module.exports = DishImgController;