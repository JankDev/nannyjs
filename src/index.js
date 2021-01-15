import Model, {DataTypes, Sequelize} from "sequelize";
import "reflect-metadata";
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, EventSubscriber, EntitySubscriberInterface, createConnection, getConnection } from 'typeorm';


// class UserService {
//     /**
//      * Returns a User object that is used for setting the security context
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
//      * @param user: User
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
//          * @returns {User}
//          */
//         findUserByUsername(username) {
//             let user = undefined
//             Employee.findAll({
//                 where: {
//                     name: username
//                 }
//             }).then(emp => user = new User(emp.name, [])
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


@Entity()
class User {
    @PrimaryGeneratedColumn('uuid')
    id;
    @Column('text',{nullable: true})
    username;
    constructor(username){
        this.username = username
    }
}

@Entity()
class Salary {
    @PrimaryGeneratedColumn('uuid')
    id;
    @Column('text', {nullable: true})
    name;
    @Column('int')
    salary;

    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
}

@EventSubscriber()
class EntitySubscriber {

    afterTransactionStart(event) {
        console.log('******************************')  
        console.log('after transation start')
             
    }

    beforeTransactionCommit(event) {
        console.log('******************************')  
        console.log('before transation commit')

        if (event.queryRunner.databaseConnection.activeQuery){
            const query = event.queryRunner.databaseConnection.activeQuery.text;
            q = query
            console.log(query)
        }     
    }
}

let q;

const connection = createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "kacper",
    password: "",
    database: "typeormtest",
    synchronize: true,
    entities: [User, Salary],
    subscribers: [EntitySubscriber],
    logging: true
}).then(connection => {
    const salary = new Salary('dev', 15000);
    

    // connection.manager.find(User)
    //     .then(console.log)
    //     .catch(console.log);
        

    // connection.transaction(async trans => {
    //     trans.find(Salary)
    //         .then(console.log)
    // })


    connection.transaction(transactionalEntityManager => {
        transactionalEntityManager.find(User)
            .then(x => {
                console.log('>>>>>>', x)
                console.log('query: ', q)
            })
    })

})
