import Model, {DataTypes, Sequelize} from "sequelize";
import "reflect-metadata";
import {
    Entity,
    Column,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    EventSubscriber,
    EntitySubscriberInterface,
    createConnection,
    getConnection, getRepository
} from 'typeorm';


// class UserService {
//     /**
//      * Returns a Salary object that is used for setting the security context
//      * @param username
//      */
//     findUserByUsername(username) {
//         throw new Error("Not implemented")
//     }
// }

// class SecurityConfiguration {
//     constructor(securityContext, userService) {
//         this.securityContext = securityContext
//         this.userService = userService
//     }
// }

// class SecurityConfigurationBuilder {
//     get securityContext() {
//         return this._securityContext;
//     }

//     setSecurityContext(value) {
//         this._securityContext = value;
//         return this
//     }

//     get userService() {
//         return this._userService;
//     }

//     setUserService(value) {
//         this._userService = value;
//         return this
//     }

//     constructor() {
//         this._securityContext = undefined
//         this._userService = undefined
//     }

//     build() {
//         return SecurityConfiguration(this._securityContext, this._userService)
//     }
// }

// class AuthorizationError extends Error {
//     constructor(message) {
//         super(message);
//     }
// }

// /**
//  * Holds the current authenticated user
//  */
// class SecurityContext {
//     constructor() {
//         if (SecurityContext._instance) {
//             throw new Error("Singleton class already instantiated")
//         }
//         this.user = null
//         SecurityContext._instance = this
//     }

//     /**
//      *
//      * @param user: Salary
//      */
//     setUser(user) {
//         this.user = user
//     }

//     clear() {
//         this.user = null
//     }

//     getUser() {
//         return this.user
//     }
// }

// const securityContext = new SecurityContext()

// function RoleAllowed(role) {
//     return (target, name, descriptor) => {
//         const user = securityContext.getUser()
//         if (!user.roles.includes(role)) throw new AuthorizationError("Not authorized!")
//         return descriptor
//     }
// }


// const sequelize = new Sequelize("postgres://user:password@localhost:5432/db")

// async function initConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

// initConnection().then(_ => {
//     class Employee extends Model {

//     }

//     Employee.init({
//         name: {
//             type: DataTypes.STRING,
//             allowNull: true
//         }
//     })
//     Employee.sync()

//     class SequelizeUserService extends UserService {

//         /**
//          *
//          * @param username
//          * @returns {Salary}
//          */
//         findUserByUsername(username) {
//             let user = undefined
//             Employee.findAll({
//                 where: {
//                     name: username
//                 }
//             }).then(emp => user = new Salary(emp.name, [])
//             )

//             return user
//         }
//     }

//     const securityConfig = new SecurityConfigurationBuilder()
//         .setUserService(new SequelizeUserService())
//         .setSecurityContext(securityContext)
//         .build()

//     class EmployeeRepo {
//         @RoleAllowed("ROLE_ADMIN")
//         findAll() {
//             return Employee.findAll()
//         }

//         findOne(){

//         }

//     }

//     const userService = new SequelizeUserService()

//     const user = userService.findUserByUsername("user")

//     securityContext.setUser(user)

//     const repo = new EmployeeRepo()
//     repo.findAll()
// })

function Secured() {
    return (target, name, descriptor) => {
        if (!user.roles.includes(role)) throw new AuthorizationError("Not authorized!")
        return descriptor
    }
}

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

// Defining models
const Salary = bookshelf.model('Salary', {
    tableName: 'salary',

    initialize() {
        this.on('fetching:collection', (mode, columns, options) => {
            options.query.where('salary', 15000)
        })
    }
})

Salary.fetchAll().then(salaries => console.log(salaries.toJSON()))

