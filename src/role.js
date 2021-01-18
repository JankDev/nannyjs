export class Role {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.children = []
    }
}


export class RoleHelper {

    static createRolesTree(roles) {
        roles.forEach(role => {
            const parent = roles.find(x => x.name === role.parent);
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

    static findRoleByName(roleNode, name) {
        if (roleNode.name === name) {
            return roleNode
        } else if (roleNode.children != null) {
            var i;
            var result = null;
            for(i = 0; result == null && i < roleNode.children.length; i++){
                 result = RoleHelper.findRoleByName(roleNode.children[i], name);
            }
            return result
        } 
        return null
    }
}