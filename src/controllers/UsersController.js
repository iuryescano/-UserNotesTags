const { hash, compare } = require("bcryptjs");

const AppError = require('../utils/AppError');

const sqliteConnection = require('../database/sqlite')

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const database = await sqliteConnection(); //mudo o nome para ASYNC para conseguir receber await dentro da classe
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);//Estou verificando se alguem ja possui esse email cadastrado, sendo assim eu adiciono um vetor para passar parametro dentro do where
        
        if(checkUserExists) {
            throw new AppError("Este email já esta em uso");
        }

        const hashedPassword = await hash(password, 8);//aqui estou definindo que a senha vai ser apresentada no banco com criptografia com complexidade 8

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ? ,?)",
            [
                name,
                email,
                hashedPassword,
            ]
        );

        return response.status(201).json();
    /*
        if(!name ){ //comentei no momento em que estou fazendo conexao com o SQL
            throw new AppError("O Nome é obrigatório!");
        }

        response.status(201).json(`Usario: ${name}. Email: ${email}. Senha: ${password}.`); 
    */
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection(); //mudo o nome para ASYNC para conseguir receber await dentro da classe
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user) {
            throw new AppError("Usuário não encontrado");
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) { //esta verificando o email do usuario 
            throw new AppError("Este email já esta em uso");
        }

        user.name = name ?? user.name; //?? significa q ou e o nome que ja esta ou o novo nome que vai ser atribuido
        user.email = email ?? user.email;

        if (password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para trocar a senha");
        }

        if (password && old_password) { //se a senha antiga e a nova forem informados...
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError("A senha antiga está incorreta");
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET 
            name = ?, 
            email = ?, 
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`, 
            [user.name, user.email, user.password, id]
        );

        return response.json();
    }
}

module.exports = UsersController;

    /*
    index - GET para listar varios registros.
    show - GET para mostrar um único registro.
    create - POST para adicionar um novo registro.
    update - PUT ou PATCH para atualizar um registro existente.
    delete - DELETE para excluir um registro existente.
    */