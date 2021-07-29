const User = require('../models/UserModel');
const ObjectId = require('mongoose').Types.ObjectId;

class UserRepository{
    async create({ name, email, password }) {
        await User.create({
            name,
            email,
            password,
        });
    }
    async findByUseremail(email) {
        return await User.findOne({ email }).select({ 'name': 1, 'email': 1, 'password': 1 });
    }
}
module.exports = new UserRepository();