const { Router } = require("express");

const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();

/*function myMiddleware(request, response, next){
    console.log("Midleware executado");
    if(!request.body.isAdmin){
        return response.status(403).json({ error: "Você não tem permissão"});
    } 


    next();
}*///exemplo de middleware



const usersController = new UsersController();

usersRoutes.post("/",/* myMiddleware,*/ usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update) ;

/* 
    app.get("/message/:id/:user", (request, response) => { //exemplo: http://localhost:3333/message/6/iury
        const { id, user } = request.params; //pegando os parametros da url, Destruturação dos parametros ROUTEPARAMETROS

        response.send(`Mensagem ID: ${id}. Usuario: ${user}.`); //rota principal
    }); 

    app.get("/users", (request, response) => { 
        const {page, limit} = request.query; //diferente do routparametros ele nao e obrigatorio

        response.send(`Pagina: ${page}, Mostrar: ${limit}.`); //rota para listar usuarios exemplo: http://localhost:3333/users?page=5&limit=10
    }) 
*/


module.exports = usersRoutes;