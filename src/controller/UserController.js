const UserRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
const jwtConfig = require('../config/jwt');
const hash = require('../utils/hash');
require('dotenv').config();

function generateJwtToken(user){
    const { _id } = user;
    return jwt.sign({
        _id,
    }, jwtConfig.secret);
}

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
            const userExists = (await UserRepository.findByUseremail(user.email)) != null;
            
            if (userExists) {
                return res.json({
                    error: true,
                    errorMessage: "Username already registered",
                })
            }
            await UserRepository.create(user);
            const newUser = await UserRepository.findByUseremail(user.email);
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
    async login(req,res){
        try {
            const {email,password}=req.body;
            if(!email || !password){
                return res.json({
                    error:true,
                    errorMessage:'abc',
                });
            }
            const user={
                email,
                password,
            }
            const checkemail=await UserRepository.findByUseremail(user.email);
            console.log(checkemail);
            if(!checkemail){
                return res.json({
                    error:true,
                    errorMessage:'Email not exits',
                })
            }
            if(!await bcrypt.compare(password,checkemail.password)){
                return res.json({

                    error:true,
                    errorMessage:'Pass not hop le',
                });
            }
            const token=generateJwtToken(user);
            return res.json({
                user,
                token
            });
            
            
        } catch (error) {
            return res.json({
                error:true,
                errorMessage:'try catch'
            });
        }
    }
}
module.exports = new UserController();