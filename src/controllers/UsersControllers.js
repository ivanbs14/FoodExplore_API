
class UsersController {
    create(request, response) {
        const { name, email, password, is_admin } = request.body;

        response.json({ name, email, password, is_admin });
    }
}

module.exports = UsersController;