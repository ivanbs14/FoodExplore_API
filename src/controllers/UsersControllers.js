const sqliteConnection = require("../database/sqlite");

class UsersController {
    /* create and insert and database data from users */
    async create(request, response) {
        const { name, email, password, is_admin } = request.body;

        const database = await sqliteConnection();
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])


        if(checkUserExists) {
            return response.status(401).json();
        }

        await database.run(
            "INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)",
            [name, email, password, is_admin]
        );

        return response.status(201).json();
    }

    
}

module.exports = UsersController;