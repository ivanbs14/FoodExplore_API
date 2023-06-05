const knex = require("../database/knex");

class DishSearchController {
    async dishSearch(request, response) {
        const user_id = request.user.id;
        const { search } = request.query;

        /* pesquisando na tabela de dish */
        const searchDish = await knex("dish")
        .select([
            "dish.id",
            "dish.title",
            "dish.img_dish",
            "dish.category",
            "dish.price",
            "dish.description",
        ])
        .where("dish.user_id", user_id)
        .whereLike("dish.title", `%${search}%`)

        const userDish = await searchDish[0].id;
        const userIngred = await knex("ingredients").where({ dish_id: userDish })
        const pratoWithIngred = searchDish.map(dish => {
            const pratoIngred = userIngred.filter(item => item.dish_id === dish.id);

            return {
                ...dish,
                ingredients: pratoIngred
            }
        });


        const searchIngredients = await knex("ingredients")
            .select([
                "ingredients.name",
                "ingredients.id",
                "ingredients.dish_id", 
            ])
            .where("ingredients.user_id", user_id)
            .whereLike("ingredients.name", `%${search}%`)
        
            const idDIsh = await searchIngredients[0].dish_id;
            const allIngredients = await knex("ingredients").where({ dish_id: idDIsh });
            const dishSelect = await knex("dish").where({ id: idDIsh });
            const ingredWithPrato = dishSelect.map(dish => {
                const pratoIngred = allIngredients.filter(item => item.dish_id === dish.id);
    
                return {
                    ...dish,
                    ingredients: pratoIngred
                }
            });

        return response.json([pratoWithIngred, ingredWithPrato]);
        
    };
}

module.exports = DishSearchController;