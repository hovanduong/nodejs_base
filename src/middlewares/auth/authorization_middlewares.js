const jwt = require('jsonwebtoken');
const config = require('../../config/jwt');
const bcrypt = require('bcryptjs');
module.exports = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {z
        res.status(500).send({ message: err });
        return;
      }
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "user") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Admin Role!" });
          return;
        }
      );
    });
  };