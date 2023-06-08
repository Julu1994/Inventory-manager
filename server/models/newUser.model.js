import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    H_password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user'],
      default: 'user'
    },
    accountId: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);
userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.H_password;
  return obj;
}

export const NewUser = mongoose.model('new-user', userSchema);