const knex = require("../database/knex");

class DishController {
    async create(request, response){
        const { title, category, price, description, ingredients } = request.body;
        const { user_id } = request.params;

        const dish_id = await knex("dish").insert({
            user_id,
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

    async filters(request, response) {
        const { title, user_id, ingredients } = request.query;

        let dish;

        if(ingredients) {
            const filterIngredients = ingredients.split(',').map(ingredients => ingredients.trim());

            dish = await knex("ingredients")
            .select([
                "dish.id",
                "dish.title",
                "dish.user_id",
            ])
            .where("dish.user_id", user_id)
            .whereLike("dish.title", `%${title}%`)
            .whereIn("name", filterIngredients)
            .innerJoin("dish", "dish.id", "ingredients.dish_id")
            .orderBy("dish.title")

        } else {
            dish = await knex("dish").where({ user_id }).whereLike("title", `%${title}%`).orderBy("title");
        }

        const userIngredients = await knex("ingredients").where({ user_id });
        const dishsIngredients = dish.map(dish => {
            const dishIngredient = userIngredients.filter(ingredient => ingredient.dish_id === dish.id);

            return {
                ...dish,
                ingredients: dishIngredient
            }
        });


        return response.json(dishsIngredients);
    }
}

module.exports = DishController;