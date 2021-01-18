
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
const bookshelf = require('bookshelf')(knex)

export function model(enityName, tableName = enityName.toLowerCase()) {
    return bookshelf.model(enityName, {
        tableName,
        initialize() {
            this.on('fetching:collection', (mode, columns, options) => {
                const roles = [2, 3];
                const tableName = options.query._single.table;
                const tableNameCapitalized = tableName.charAt(0).toUpperCase() + tableName.slice(1);
                for (let role of roles) {
                    options.query.orWhereRaw(`EXISTS (SELECT * FROM ACL A WHERE A.TableName = '${tableNameCapitalized}' AND A.RoleId = ${role} AND A.EntityId = salaries.SalaryId)`)
                }
            })
        }
    })
}