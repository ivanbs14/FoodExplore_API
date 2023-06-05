const knex = require("../database/knex");

class DishControllerClient {
   
    async dishForCategoryClient(request, response) {
        /* const user_id = request.user.id; */
        const { category } = request.query;

        const allDishes = await knex("dish")
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

}

module.exports = DishControllerClient;