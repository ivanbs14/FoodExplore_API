require("express-async-errors");
const AppError = require("./utils/AppError");
const express = require("express");
const migrationsRun = require("./database/sqlite/migrations");
const routes = require("./routes");

const app = express();
app.use(express.json());

migrationsRun();

app.use(routes);

/* condicionais de error */
app.use(( error, request, response, next ) => {
    /* verificar se error do client */
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    /* error internal server */
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running ${PORT}`));