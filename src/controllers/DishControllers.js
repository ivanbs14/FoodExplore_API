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
    
    async dishForCategory(request, response) {
        const user_id = request.user.id;
        const { category } = request.query;

        const allDishes = await knex("dish")
        .where({ user_id: user_id})
        .where({ category: category})
        .select([
            "dish.id",
            "dish.user_id",
            "dish.title",
            "dish.img_dish",
            "dish.category",
            "dish.price",
            "dish.description",
        ]);

        return response.json(allDishes);
        
    };
    
    async allPreviewDish(request, response) {
        const { id } = request.params;
        const user_id = request.user.id;

        const allDishes = await knex("dish")
        .where({ user_id: user_id})
        .where({ id: id})
        .select([
            "dish.id",
            "dish.user_id",
            "dish.title",
            "dish.img_dish",
            "dish.category",
            "dish.price",
            "dish.description",
        ]);
        
        const dishId = await knex("ingredients").where({dish_id: id});
        const foodWithIngred = allDishes.map(food => {
            const foodIngred = dishId.filter(ingred => ingred.dish_id === food.id);
            return {
                ...food,
                ingredients: foodIngred
            }
        });
        
        return response.json(foodWithIngred); 
    };

    async update(request, response) {
        const { title, category, price, description, ingredient } = request.body;
        const id = request.user.id;
        const { dishId } = request.params;

        /* console.log(request.body); */

        const dish = await knex("dish").where({ id: dishId }).first();
        const ingredients = await knex("ingredients").where({ dish_id: dishId });

        if (dish.id) {
            dish.title = title ?? dish.title;
            dish.category = category ?? dish.category;
            dish.price = price ?? dish.price;
            dish.description = description ?? dish.description;

            await knex("dish").update(dish).where({ id: dishId });
        };

        if (ingredients) {
            const dish_id = await dish.id;
            const user_id = await dish.user_id;
            await knex("ingredients").delete(ingredient).where({ dish_id: dishId });

            const ingredientsUpdate = await ingredient.map( name => {
                return {
                    dish_id,
                    name,
                    user_id,
                }
            });

            await knex("ingredients").insert(ingredientsUpdate);

        };

        return response.json(dish);
    };

    async delete(request, response) {
        const { id } = request.params;

        await knex("dish").where({ id }).delete("PRAGMA foreign_keys = 1");

        return response.json();
    };

}

module.exports = DishController;