const knex = require("../database/knex");

class DishController {
    async create(request, response){
        const { title, category, price, description, ingredients } = request.body;
        const user_id = request.user.id;
        
        const [dish_id] = await knex("dish").insert({
            user_id,
            title,
            category,
            price,
            description,

        });

        const dishCreated = await knex("dish").where({ id: dish_id }).first();

        const ingredientsInsert = await ingredients.map( name => {
            return {
                dish_id,
                name,
                user_id,
            }
        });

        await knex("ingredients").insert(ingredientsInsert);

        response.json(dishCreated);
    };

    async filters(request, response) {
        const { title, ingredients } = request.query;
        const user_id = request.user.id;

        let dish;
        
        if (ingredients) {
            const filterIngredients = ingredients.split(',').map(ingred => ingred.trim());

            dish = await knex("ingredients")
                .whereIn("name", filterIngredients)
                .select([
                    "dish.id",
                    "dish.user_id",
                    "dish.title",
                    "img_dish",
                    "dish.category",
                    "dish.price",
                    "dish.description",
                ])
                .where("dish.user_id", user_id)
                /* .whereLike("dish.title", `%${title}%`) */
                .innerJoin("dish", "dish.id", "ingredients.dish_id")
                .orderBy("dish.title")

        } else {
            dish = await knex("dish")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title")
        }

        /* preview ingredients from dish */
        const searchIngredts = await knex("ingredients").where({ user_id });
        const ingredtsWithDish = dish.map(dishh => {
            const dishIngredts = searchIngredts.filter(ingredt => ingredt.dish_id === dishh.id);

            return {
                ...dishh,
                ingredients: dishIngredts
            }
        });

        return response.json(ingredtsWithDish);
    };

    async update(request, response) {
        const { title, category, price, description, ingredients } = request.body;
        const id = request.user.id;

        const dish = await knex("dish").where({ id: id }).first();
        const ingredient = await knex("ingredients").where({ dish_id: id });

        if (dish.id) {
            dish.title = title ?? dish.title;
            dish.category = category ?? dish.category;
            dish.price = price ?? dish.price;
            dish.description = description ?? dish.description;

            await knex("dish").update(dish).where({ id: id });
        };

        if (ingredient) {
            const dish_id = await dish.id;
            const user_id = await dish.user_id;
            await knex("ingredients").delete(ingredient);

            const ingredientsUpdate = await ingredients.map( name => {
                return {
                    dish_id,
                    name,
                    user_id,
                }
            });

            await knex("ingredients").insert(ingredientsUpdate);

        };

        return response.json();
    };

    async delete(request, response) {
        const { id } = request.params;

        await knex("dish").where({ id }).delete("PRAGMA foreign_keys = 1");

        return response.json();
    };

}

module.exports = DishController;