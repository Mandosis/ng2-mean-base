import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

let toLower: any = (value: string) => {
  return value.toLowerCase();
}

let userSchema: any = new Schema({
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
userSchema.pre('save', function(next: any) {
  let user = this;

  // If the password was not changed, do not continue
  if (!user.isModified('password')) {
    return next();
  }

  // Create salt for hash
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err: any, salt: any) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err: any, hash: any) {
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
userSchema.methods.comparePassword = function(candidatePassword: string, done: any) {
  bcrypt.compare(candidatePassword, this.password, function(err: any, isMatch: any) {
    if (err) {
      return done(err);
    } else {
      done(null, isMatch);
    }
  });
};


let User = mongoose.model('User', userSchema);

module.exports = User;
