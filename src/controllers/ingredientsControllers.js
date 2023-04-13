const knex = require("../database/knex");

class IngredientsController {
    async index(request, response) {
        const { dish_id } = request.query;

        const ingredients = await knex("ingredients").where({ dish_id: dish_id })

        return response.json(ingredients);
    }
}

module.exports = IngredientsController;