class SecurityConfiguration {
    constructor(securityContext, aclTableName) {
        this.securityContext = securityContext;
        this.aclTableName = aclTableName;
    }
}

class SecurityConfigurationBuilder {
    setSecurityContext(value) {
        this._securityContext = value;
        return this
    }

    setAclTableName(value) {
        this._aclTableName = value;
        return this
    }

    constructor() {
        this._securityContext = undefined;
        this._aclTableName = undefined;
    }

    build() {
        return SecurityConfiguration(this._securityContext, this._aclTableName)
    }
}


/**
 * Holds the current authenticated user
 */
class SecurityContext {
    constructor() {
        if (SecurityContext._instance) {
            throw new Error("Singleton class already instantiated")
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