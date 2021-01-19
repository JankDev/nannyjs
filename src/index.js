import { secured } from './database';
import { User } from './user';
import { SecurityContext, SecurityConfigurationBuilder } from './security-config';
import { bookshelf } from './config';


@secured
class DatabaseClient {
    constructor(model, securityConfig) {
        this.model = model;
        this.securityConfig = securityConfig;
    }
    findAll() {
        return this.model.fetchAll(); 
    }
};

const user1 = new User(1, 'User 1', 1);
const user2 = new User(2, 'User 2', 2);

const securityContext = new SecurityContext();
const securityConfig = new SecurityConfigurationBuilder()
                            .setSecurityContext(securityContext)
                            .setAclTableName('ACL')
                            .build()

const Salary = bookshelf.model('Salaries', {
    tableName: 'salaries'
});

const client = new DatabaseClient(Salary, securityConfig)

securityContext.setUser(user1);

client.findAll().then(x => console.log(x.toJSON()))
