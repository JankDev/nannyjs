import { User } from './user';
import { RoleHelper, roles } from './role';
import { SecurityContext, SecurityConfigurationBuilder } from './security-config';
import { bookshelf } from './config';
import { DatabaseClient } from './client';


// prepare rolse tree
const rolesTree = RoleHelper.createRolesTree(roles);

// test users
const users = [
    new User(1, 'Root User', 1),
    new User(2, 'Admin 1', 2),
    new User(3, 'Admin 2', 3),
    new User(4, 'User 1', 4),
    new User(5, 'User 2', 5),
    new User(6, 'User 3', 6),
]

// init security context and config
const securityContext = new SecurityContext();
const securityConfig = new SecurityConfigurationBuilder()
                            .setSecurityContext(securityContext)
                            .setAclTableName('ACL')
                            .setRolesStructure(rolesTree)
                            .setAclTableNameColumn('TableName')
                            .setAclRoleIdColumn('RoleId')
                            .setAclEntityIdColumn('EntityId')
                            .build()

// basic bookshelf model
const Salary = bookshelf.model('Salary', {
    tableName: 'salaries'
});

// create secured client  
const client = new DatabaseClient(Salary, securityConfig)

// set current user and test secured data access
securityContext.setUser(users[0]);
client.findAll().then(x => console.log(x.toJSON()));
