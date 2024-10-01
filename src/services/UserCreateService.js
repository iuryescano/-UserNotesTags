const { hash, compare } = require("bcryptjs");
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

        await this.userRepository.create({ name, email, password: hashedPassword });

    }
}

module.exports = UserCreateService