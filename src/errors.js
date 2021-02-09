export class AuthorizationError extends Error {
    constructor(message) {
        super(message);
    }
}

export class SecurityContextNotProvidedError extends Error {
    constructor(message) {
        super(message);
    }
}

export class SecurityContextAlreadyInitializedError extends Error {
    constructor(message) {
        super(message);
    }
}