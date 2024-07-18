const sqliteConnection = require('../../sqlite');

const createUsers = require('./createUsers');

async function migrationsRun(){
    const schemas  = [ //estou me referindo as tabelas que vao ser criadas
        createUsers
    ].join('');//esta removendo os espacos

    sqliteConnection()
    .then(db => db.exec(schemas))//estou executando as minhas migrations
    .catch(error => console.error(error)); //aqui e para tratar o erro caso acontececa
}

module.exports = migrationsRun; //exportando minha function