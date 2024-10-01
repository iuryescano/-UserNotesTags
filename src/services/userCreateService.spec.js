const UserCreateService = require('./UserCreateService');
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");

it("user should be create", async () => {
    const user = {
        name: "User Test",
        email: "user@example.com",
        password: "123"
    };

    const userRepository = new UserRepositoryInMemory();
    const userCreateService = new UserCreateService(userRepository);
    const userCreated = await userCreateService.execute(user);

    console.log(userCreated)
    
    expect(userCreated).toHaveProperty("id"); 

});