import "reflect-metadata";


const knex = require('knex')({
    client: 'postgres',
    connection: {
        host: '127.0.0.1',
        user: 'kacper',
        password: '',
        database: 'dp',
        charset: 'utf8'
    }
})
export const bookshelf = require('bookshelf')(knex)