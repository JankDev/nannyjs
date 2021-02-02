import {bookshelf} from './config';

function model(enityName, securityConfig) {
    return bookshelf.model(enityName, {
        tableName: enityName.toLowerCase(),
        initialize() {
            this.on('fetching:collection', (mode, columns, options) => {
                // TODO get sub roles from role tree (provided by user?)
                const roles = [securityConfig.securityContext.user.role];
                const tableName = options.query._single.table;
                const tableNameCapitalized = tableName.charAt(0).toUpperCase() + tableName.slice(1);
                console.log(`role: ${roles[0]}`)

                for (let role of roles) {
                    options.query.orWhereRaw(`EXISTS (SELECT * FROM ${securityConfig.aclTableName} A WHERE A.TableName = '${tableNameCapitalized}' AND A.RoleId = ${role} AND A.EntityId = salaries.SalaryId)`)
                }
            })
        }
    })
}

export function secured(Class) {
    return (...args) => {
        const secureModel = model(args[0].extend().__super__.tableName, args[1]);
        return new Class(secureModel)
    };
}

