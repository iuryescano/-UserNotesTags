require("express-async-errors"); //usando middleware para tratar erros async
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError"); //importando classe de erros
const express = require("express");
const routes = require("./routes"); //importando rotas
const uploadConfig = require("./configs/upload");


migrationsRun();


const app = express(); //inciando o express
app.use(express.json()); //usando middleware para tratar corpo das requisicoes

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes); //rota principal


app.use(( error, request, response, next ) => { //middleware para tratar erros globais 
    if(error instanceof AppError) { //se error for do tipo AppError 
        return response.status(error.statusCode).json({ //retornando erro customizado 
                error: error.message, //mensagem personalizada
                message: error.message //mensagem padrão do express-async-errors
            });
    }

    console.error(error); //imprimindo erro no console

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });

});

const PORT = 3333;  //porta onde o server vai rodar
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); 