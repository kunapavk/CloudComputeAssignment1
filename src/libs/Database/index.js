const config = require(`../../../config.json`);
console.log(config);
const knex = require(`knex`)({
    client: config.database.dialect,
    connection: {
        host: config.database.host,
        port: config.database.port,
        user: config.database.username,
        password: config.database.password,
        database: config.database.name,
        charset: `utf8`
    },
    debug: false
});

const bookshelf = require(`bookshelf`)(knex);

const Users = bookshelf.Model.extend({
    tableName: `users`
});

exports.Users = Users;