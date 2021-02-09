import { bookshelf } from './config';
import { RoleHelper } from './role';
import Pluralize from 'pluralize'

function model(entityName, securityConfig) {
    return bookshelf.model(entityName, {
        tableName: Pluralize(entityName).toLowerCase(),
        initialize() {
            this.on('fetching:collection', (mode, columns, options) => {
                const userRole = RoleHelper.findRoleById(securityConfig.rolesStructure, securityConfig.securityContext.user.role);
                const userRoles = RoleHelper.getFlattenChildrenIds(userRole, [userRole.id]);
                const tableNameCapitalized = capitalize(options.query._single.table);

                for (let role of userRoles) {
                    options.query.orWhereRaw(`EXISTS (SELECT * FROM ${securityConfig.aclTableName} A WHERE A.${securityConfig.aclTableNameColumn} = '${tableNameCapitalized}' AND A.${securityConfig.aclRoleIdColumn} = ${role} AND A.${securityConfig.aclEntityIdColumn} = ${tableNameCapitalized}.Id)`);
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

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
