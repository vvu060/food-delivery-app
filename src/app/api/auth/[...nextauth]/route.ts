import { User } from '@/models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'test@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: { email: string; password: string }, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URI || '');

        const user = await User.findOne({ email }).exec(); // Add .exec() to execute the query
        const passwordOk =
          user && password && bcrypt.compareSync(password, user.password);

        console.log({ passwordOk });

        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
