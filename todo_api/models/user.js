const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: value => validator.isEmail(value),
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.SECRET).toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save()
    .then(() => {
      return token;
    });
};

UserSchema.methods.removeToken = function(token) {
  var user = this;

  console.log(user);

  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({email})
    .then((user) => {
      if (!user) {
        return Promise.reject('Email not found.');
      }

      return bcrypt.compare(password, user.password)
        .then((res) => {
          if (res) {
            return Promise.resolve(user);
          } else {
            return Promise.reject('Password incorrect.');
          }
        });
    });
};

// hash password
UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, 10);
  }

  next();
});

// Todo model
var User = mongoose.model('User', UserSchema);

module.exports = {
  User
}