import {_} from 'lodash'


class UserEntity {
    constructor(id, username, parentId) {
        this.id = id;
        this.username = username;
        this.parentId = parentId;
    }
}

class ACLEntity {
    constructor(userId, table, entityId) {
        this.userId = userId;
        this.table = table;
        this.entityId = entityId;
    }
}

class SalaryEntity {
    constructor(id, name, value) {
        this.id = id;
        this.name = name;
        this.value = value;
    }
}

class User {
    constructor(id, username, parentId) {
        this.id = id;
        this.username = username;
        this.parentId = parentId;
        this.children = []
    }
}

const mockedDb = new Map()
mockedDb.set("Users", [
    new UserEntity(1, "dupa", null),
    new UserEntity(2, "admin1", 1),
    new UserEntity(3, "user1", 1),
    new UserEntity(4, "admin1.1", 2),
    new UserEntity(5, "user1.1", 3),
    new UserEntity(6, "user1.2", 3),
]);
mockedDb.set("Salaries", [
    new SalaryEntity(1, "chairman", 50000),
    new SalaryEntity(2, "PM", 8000),
    new SalaryEntity(3, "dev", 15000),
    new SalaryEntity(4, "tester1", 8000),
    new SalaryEntity(5, "tester2", 7000),
]);
mockedDb.set("ACL", [
    // dupa access
    new ACLEntity(1, "Salaries", 1),
    new ACLEntity(1, "Salaries", 2),
    new ACLEntity(1, "Salaries", 3),
    new ACLEntity(1, "Salaries", 4),
    new ACLEntity(1, "Salaries", 5),
    // admin1 access
    new ACLEntity(2, "Salaries", 2),
    new ACLEntity(2, "Salaries", 3),
    new ACLEntity(2, "Salaries", 4),
    new ACLEntity(2, "Salaries", 5),
    // admin1.1 access
    new ACLEntity(4, "Salaries", 3),
    new ACLEntity(4, "Salaries", 4),
    new ACLEntity(4, "Salaries", 5),
    // user1 access
    new ACLEntity(3, "Salaries", 4),
    new ACLEntity(3, "Salaries", 5),
]);


class UserService {

    constructor(users) {
        this.users = UserHelper.createUsersTree(users)
    }

    setCurrentUser(val) {
        this.currentUser = UserHelper.findUserByUsername(this.users, val)
        if (!this.currentUser) {
            throw new Error("User doesn't exist")
        }
        this.roles = UserHelper.getFlattenChildren(this.currentUser, [this.currentUser]).map(x => x.username)
    }
}


class UserHelper {

    static createUsersTree(users) {
        users.forEach(user => {
            const parent = users.find(x => x.id === user.parentId);
            if (parent) {
                parent.children ? parent.children.push(user) : parent.children = [user];
            }
        });
        return users.filter(x => !x.parentId).pop()
    }

    static getFlattenChildren(user, acc) {
        if (!user.children) {
            return []
        }
        user.children.forEach(x => {
            acc.push(x);
            UserHelper.getFlattenChildren(x, acc)
        })
        return acc
    }

    static findUserByUsername(userNode, username) {
        if (userNode.username === username) {
            return userNode
        } else if (userNode.children != null) {
            var i;
            var result = null;
            for(i = 0; result == null && i < userNode.children.length; i++){
                 result = UserHelper.findUserByUsername(userNode.children[i], username);
            }
            return result
        } 
        return null
    }
}


class DBConnection {
    constructor(db, userService) {
        this.db = db
        this.userService = userService
    }

    @withRole("admin1")
    getSalaries() {
        return this.db.get("Salaries")
    }

}


function withRole(role) {
    return (target, name, descriptor) => {
        // implement me
        return descriptor
    }
}

const userService = new UserService(mockedDb.get("Users"));
const db = new DBConnection(mockedDb, userService)


let salaries = db.getSalaries()
console.log(salaries)
