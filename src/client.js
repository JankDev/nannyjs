import { secured } from './secured';

@secured
export class DatabaseClient {
    constructor(model, securityConfig) {
        this.model = model;
        this.securityConfig = securityConfig;
    }

    findAll() {
        return this.model.fetchAll(); 
    }
}