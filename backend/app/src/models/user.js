import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

//* ** MODELS ***//
const UserSchema = new mongoose.Schema({

  user_id: {
    type: String,
    index: {
      unique: true,
      sparse: true,
    },
  },
  access_token: String,
  email: String,
  password: String,
  registrationDate: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

/** QUERY * */
const findUserByTokenQuery = token => User.findOne({ access_token: token });

//* * PASSWORD **//
UserSchema.methods.generateHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

UserSchema.methods.verifyPassword = (enteredPassword, password) =>
  bcrypt.compareSync(enteredPassword, password);


//* * EXPORTS **//
exports.schema = UserSchema;
exports.model = User;
exports.findUserByTokenQuery = findUserByTokenQuery;
