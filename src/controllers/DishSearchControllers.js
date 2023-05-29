const knex = require("../database/knex");

class DishSearchController {
    async dishSearch(request, response) {
        const user_id = request.user.id;
        const { search } = request.query;

        const allDishes = await knex("dish")
        .select([
            "dish.id",
            "dish.title",
            "dish.img_dish",
            "dish.category",
            "dish.price",
            "dish.description",
            "ingredients.name",
            "ingredients.id",
            "ingredients.dish_id",
        ])
        .where("dish.user_id", user_id)
        .whereLike("dish.title", `%${search}%`)
        .innerJoin("ingredients", "ingredients.dish_id", "dish.id")

        const dishForIngredient = await knex("ingredients")
        .select([
            "dish.id",
            "dish.title",
            "dish.img_dish",
            "dish.category",
            "dish.price",
            "dish.description",
            "ingredients.name",
            "ingredients.id",
            "ingredients.dish_id",
        ])
        .where("ingredients.user_id", user_id)
        .whereLike("ingredients.name", `%${search}%`)
        .innerJoin("dish", "dish.id", "ingredients.dish_id")

        return response.json([allDishes, dishForIngredient]);
            
    };
}

module.exports = DishSearchController;