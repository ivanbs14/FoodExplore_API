const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class UsersController {
    /* create and insert and database data from users */
    async create(request, response) {
        const { name, email, password, is_admin } = request.body;

        const database = await sqliteConnection();
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])


        if(checkUserExists) {
            throw new AppError("Este e-mail ja está em uso.");
        }

        await database.run(
            "INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)",
            [name, email, password, is_admin]
        );

        
        return response.status(201).json({ name, email, password, is_admin });
    }

    
}

module.exports = UsersController;