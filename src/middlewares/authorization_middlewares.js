
const db=require('../models/index');
const Role=db.role;
const User=db.user;


module.exports = (req, res, next) => {
   
    User.findById(req.body).exec((err, user) => {
      if (err) {
        return res.json({
            error:true,
            message:err
        });
      }
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            return res.json({
                error:true,
                message:err
            });
          }
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
          res.json({
            error:true,
            message:"Require user Role!"
          });
          return;
        }
      );
    });
  };