import "reflect-metadata";


const knex = require('knex')({
    client: 'postgres',
    connection: {
        host: '127.0.0.1',
        user: 'user',
        password: 'password',
        database: 'db',
        charset: 'utf8'
    }
})
export const bookshelf = require('bookshelf')(knex)
