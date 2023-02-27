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
}

module.exports = DishController;