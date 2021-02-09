import { SecurityContextNotProvidedError, SecurityContextAlreadyInitializedError } from './errors';

class SecurityConfiguration {
    constructor(securityContext, aclTableName, rolesStructure, aclTableNameColumn, aclRoleIdColumn, aclEntityIdColumn) {
        this.securityContext = securityContext;
        this.aclTableName = aclTableName;
        this.rolesStructure = rolesStructure;
        this.aclTableNameColumn = aclTableNameColumn;
        this.aclRoleIdColumn = aclRoleIdColumn;
        this.aclEntityIdColumn = aclEntityIdColumn;
    }
}

export class SecurityConfigurationBuilder {
    setSecurityContext(value) {
        this._securityContext = value;
        return this
    }

    setAclTableName(value) {
        this._aclTableName = value;
        return this
    }

    setRolesStructure(value) {
        this._rolesStructure = value;
        return this
    }

    setAclTableNameColumn(value) {
        this._aclTableNameColumn = value;
        return this
    }

    setAclRoleIdColumn(value) {
        this._aclRoleIdColumn = value;
        return this
    }

    setAclEntityIdColumn(value) {
        this._aclEntityIdColumn = value;
        return this
    }

    constructor() {
        this._securityContext = undefined;
        this._aclTableName = undefined;
        this._rolesStructure = undefined;
    }

    build() {
        if (!this._securityContext) {
            throw new SecurityContextNotProvidedError('You have to provide SecurityContext instance');
        }

        if (!this._aclTableName) {
            this._aclTableName = 'ACL';
        }

        if (!this._rolesStructure) {
            this._rolesStructure = [];
        }

        if (!this._aclTableNameColumn) {
            this._aclTableNameColumn = 'TableName';
        }

        if (!this._aclRoleIdColumn) {
            this._aclRoleIdColumn = 'RoleId';
        }

        if (!this._aclEntityIdColumn) {
            this._aclEntityIdColumn = 'EntityId';
        }

        return new SecurityConfiguration(this._securityContext, this._aclTableName, this._rolesStructure, this._aclTableNameColumn, this._aclRoleIdColumn, this._aclEntityIdColumn);
    }
}


/**
 * Holds the current authenticated user
 */
export class SecurityContext {
    constructor() {
        if (SecurityContext._instance) {
            throw new SecurityContextAlreadyInitializedError("You cannot provide more then one instance of SecuryContext in your application")
        }
        this.user = null
        SecurityContext._instance = this
    }

    /**
     *
     * @param user
     */
    setUser(user) {
        this.user = user
    }

    clear() {
        this.user = null
    }

    getUser() {
        return this.user
    }
}