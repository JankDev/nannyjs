export class Role {
    constructor(id, name, parent) {
        this.id = id;
        this.name = name;
        this.parent = parent;
        this.children = []
    }
}


export class RoleHelper {

    static createRolesTree(roles) {
        roles.forEach(role => {
            const parent = roles.find(x => x.id === role.parent);
            if (parent) {
                parent.children ? parent.children.push(role) : parent.children = [role];
            }
        });
        return roles.filter(x => !x.parent).pop()
    }

    static getFlattenChildrenIds(role, acc) {
        if (!role.children) {
            return []
        }
        role.children.forEach(x => {
            acc.push(x.id);
            RoleHelper.getFlattenChildrenIds(x, acc)
        })
        return acc
    }

    static findRoleById(roleNode, id) {
        if (roleNode.id === id) {
            return roleNode
        } else if (roleNode.children != null) {
            let i;
            let result = null;
            for(i = 0; result == null && i < roleNode.children.length; i++){
                 result = RoleHelper.findRoleById(roleNode.children[i], id);
            }
            return result
        } 
        return null
    }
}

// example roles structure in app
export const roles = [
    new Role(1, 'root', null),
    new Role(2, 'admin 1', 1),
    new Role(3, 'admin 2', 1),
    new Role(4, 'user 1', 2),
    new Role(5, 'user 2', 2),
    new Role(6, 'user 3', 3)
]