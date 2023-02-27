const knex = require("../database/knex");

class DishController {
    async create(request, response){
        const { title, category, price, description, ingredients } = request.body;
        const { user_id } = request.params;

        const dish_id = await knex("dish").insert({
            title,
            category,
            price,
            description
        });

        const ingredientsInsert = await ingredients.map( name => {
            return {
                dish_id,
                name,
                user_id
            }
        });

        await knex("ingredients").insert(ingredientsInsert);

        response.json();

    }

    async previewDish(request, response) {
        const { id } = request.params;

        const dish = await knex("dish").where({ id }).first();
        const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

        return response.json({
            ...dish,
            ingredients
        });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("dish").where({ id }).delete("PRAGMA foreign_keys = 1");

        return response.json();
    }
}

module.exports = DishController;