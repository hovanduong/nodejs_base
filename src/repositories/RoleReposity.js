const Role = require('../models/role');
class RoleReposity{

    async findByUseremail() {
        const name='user';
        return await Role.findOne({name});
    }
}
module.exports = new RoleReposity();