const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//User Model
const User = require("../models/user");

exports.register = (req, res) => {
  const { user_type, name, email, password, confirm_password } = req.body;

  console.log(req.body);

  //Simple validation
  if (!name || !email || !password || !confirm_password) {
    return res.json({
      status: 400,
      msg: "Please enter all the fields "
    });
  }

  //Check for User type
  if (!user_type) {
    return res.json({
      status: 500,
      msg: "Internal Server Error"
    });
  }
  //Check for existing user
  User.findOne({ email }).then(user => {
    if (user)
      return res.json({
        status: 400,
        msg: "User already exists "
      });

    if (password != confirm_password) {
      return res.json({
        status: 400,
        msg: "Password Didn't match"
      });
    }

    if (password.length < 8) {
      return res.json({
        status: 400,
        msg: "Password should be atleast 8 characters"
      });
    }

    var number = 0;
    var low_alph = 0;
    var up_alph = 0;
    var spl_char = 0;
    for (var i = 0; i < password.length; i++) {
      var ascii = password.charCodeAt(i);
      if (ascii >= 48 && ascii <= 57) {
        number = 1;
      } else if (ascii >= 65 && ascii <= 90) {
        up_alph = 1;
      } else if (ascii >= 97 && ascii <= 122) {
        low_alph = 1;
      } else {
        spl_char = 1;
      }
    }

    if (number != 1 || low_alph != 1 || up_alph != 1 || spl_char != 1) {
      return res.json({
        status: 400,
        msg: "Password not efficient"
      });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign({ id: user.id }, config.get("jwtSecret"), (err, token) => {
            if (err) throw err;
            res.json({
              status: 200,
              users: {
                id: user.id,
                name: user.name,
                email: user.email,
                user_type: user.user_type
              }
            });
          });
        });
      });
    });
  });
};
