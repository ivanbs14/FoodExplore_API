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

    async update(request, response) {
        const { name, email } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user) {
            throw new AppError("Usuário não encontrado")
        }

        const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso.");
        }

        user.name = name;
        user.email = email;

        await database.run(`UPDATE users SET
        name = ?,
        email = ?,
        updated_at = ?
        WHERE id = ?`,
        [user.name, user.email, new Date(), id]
        );

        return response.json();
    }
    
}

module.exports = UsersController;