const sqliteConnection = require('../database/sqlite')

class UserRepository {
    async findByEmail(email) {
        const database = await sqliteConnection(); //mudo o nome para ASYNC para conseguir receber await dentro da classe
        const user = await database.get("SELECT * FROM users WHERE email = (?)", [email]);//Estou verificando se alguem ja possui esse email cadastrado, sendo assim eu adiciono um vetor para passar parametro dentro do where
    
        return user;
    }

    async create({ name, email, password }) {
        const database = await sqliteConnection(); //mudo o nome para ASYNC para conseguir receber await dentro da classe
        const userId = await database.run("INSERT INTO users (name, email, password) VALUES (?, ? ,?)",
            [
                name,
                email,
                password,
            ]
        );
    
        return { id: userId };
    }

}


module.exports = UserRepository;