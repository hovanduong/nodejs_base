const db = require('../models/index');
const ObjectId = require('mongoose').Types.ObjectId;
const User=db.user;
class UserRepository{
    async create({ name, email, password,roles }) {
        await User.create({
            name,
            email,
            password,     
            roles
        });
    }
    async findByUseremail(email) {
        return await User.findOne({ email }).select({ 'name': 1, 'email': 1, 'password': 1 });
    }
}
module.exports = new UserRepository();