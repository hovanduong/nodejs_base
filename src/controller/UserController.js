const UserRepository = require('../repositories/UserRepository');
const RoleReposity = require('../repositories/RoleReposity');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
const jwtConfig = require('../config/jwt');
const hash = require('../utils/hash');
const Role=require('../models/role');
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
           
            if (!name || !email || !password) {
                return res.json({
                    error: true,
                    errorMessage: "Invalid fields.",
                })
            }
            
           
            const userExists = (await UserRepository.findByUseremail(email)) != null;
    
            if (userExists) {
                return res.json({
                    error: true,
                    errorMessage: "Email already registered",
                })
            }

            const role=(await RoleReposity.findByUseremail());
           
            if(role._id == null){
                return res.json({
                    error:true,
                    errorMessage:"Role not exit"
                })
            }
       
            const roles=role._id;
            const user = {
                name,
                email,
                password,  
                roles
            }
            console.log('a');
             await UserRepository.create(user);
              const newUser =await  UserRepository.findByUseremail(user.email);
              const token = generateJwtToken(newUser);
              user.password = undefined;
              return res.json({
                  user: newUser,
                  token:token
              })
        } catch (err) {
            return res.json({
                error: true,
                errorMessage: "An error has occurred. Retry!.",
                
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