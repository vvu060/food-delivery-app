import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: (pass: string) => {
        console.log({ pass });
        if (!pass.length || pass.length < 5) {
          new Error('Password must be at least 5 characters long');
          return false;
        }
      },
    },
  },
  { timestamps: true }
);

UserSchema.post('validate', async function (user) {
  const pass = user.password;
  const salt = await bcrypt.genSaltSync(10);
  user.password = await bcrypt.hashSync(pass, salt);
});

export const User = models?.User || model('User', UserSchema);
