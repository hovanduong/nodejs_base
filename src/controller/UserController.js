const UserRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const jwtConfig = require('../config/jwt');
// const hash = require('../utils/hash');
require('dotenv').config();
class UserController {
    async create(req, res) {
        try {
            const { name, email, password } = req.body;
        
            console.log(req.body);
            if (!name || !email || !password) {
                return res.json({
                    error: true,
                    errorMessage: "Invalid fields.",
                })
            }
            const user = {
                name,
                email,
                password,
            }
            const userExists = (await UserRepository.findByUsername(user.email)) != null;
            
            if (userExists) {
                return res.json({
                    error: true,
                    errorMessage: "Username already registered",
                })
            }
            await UserRepository.create(user);
            const newUser = await UserRepository.findByUsername(user.username);
            // const token = generateJwtToken(newUser);
            user.password = undefined;
            return res.json({
                user: newUser,
                // token
            })

        } catch (err) {
            console.log(err.message)
            return res.json({
                error: true,
                errorMessage: "An error has occurred. Retry!.",
                err
                
            })
        }
    }
}
module.exports = new UserController();