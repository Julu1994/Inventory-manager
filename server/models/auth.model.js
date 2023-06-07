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

export const User = mongoose.model('user', userSchema);