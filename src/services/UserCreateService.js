const { hash } = require("bcryptjs");
const AppError = require('../utils/AppError');

class UserCreateService{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({ name, email, password }){
        const checkUserExists = await this.userRepository.findByEmail(email);

        if(checkUserExists) {
            throw new AppError("Este email já esta em uso");
        }

        const hashedPassword = await hash(password, 8);//aqui estou definindo que a senha vai ser apresentada no banco com criptografia com complexidade 8

        const userCreated = await this.userRepository.create({ name, email, password: hashedPassword });

        return userCreated;
    }
}

module.exports = UserCreateService