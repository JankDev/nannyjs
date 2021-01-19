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
            const parent = roles.find(x => x.id === role.parent.id);
            if (parent) {
                parent.children ? parent.children.push(role) : parent.children = [role];
            }
        });
        return roles.filter(x => !x.parent).pop()
    }

    static getFlattenChildren(role, acc) {
        if (!role.children) {
            return []
        }
        role.children.forEach(x => {
            acc.push(x);
            RoleHelper.getFlattenChildren(x, acc)
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