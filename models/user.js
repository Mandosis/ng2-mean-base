"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

let toLower = (value) => {
  return value.toLowerCase();
}

let userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  normalized: {
    username: { type: String, required: true, unique: true, set: toLower }
  }
});

/*
 * Encrypt password before saving to the database
 */
userSchema.pre('save', function(next) {
  let user = this;

  // If the password was not changed, do not continue
  if (!user.isModified('password')) {
    return next();
  }

  // Create salt for hash
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      // Replace clear text with hashed password
      user.password = hash;

      next();
    });
  });
});

/*
 * Compare the provided password against the database
 */
userSchema.methods.comparePassword = function(candidatePassword, done) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return done(err);
    } else {
      done(null, isMatch);
    }
  });
};


let User = mongoose.model('User', userSchema);

module.exports = User;
