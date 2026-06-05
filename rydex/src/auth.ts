import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDB from "./lib/mongodb";
import User from "./models/User";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Login using Email and Password
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email"
        },
        password: {
          type: "password",
          label: "Password"
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email or Password is incorrect");
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const isPasswordcorrect = await bcrypt.compare(credentials.password as string, user.password);
        if (!isPasswordcorrect) {
          throw new Error("Incorrect Password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role
        }
      }
    }),

    // Login & signUp using Google
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == 'google') {
        await connectDB();
        const dbUser = await User.findOne({ email: user?.email });
        if (!dbUser) {
          const newUser = await User.create({
            name: user?.name || "Unknown User",
            email: user?.email || "",
            image: user?.image || ""
          })
          user.id = newUser?._id.toString();
          user.role = newUser?.role as string;

        } else {
          user.id = dbUser?._id.toString();
          user.role = dbUser?.role as string;
        }
      }
      return true;
    },

    // It puts user details in the token
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = (user as any).role;
      }

      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }

      return token;
    },

    //It puts user details in the session
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string,
          session.user.name = token.name,
          session.user.email = token.email as string,
          session.user.image = token.image as string,
          session.user.role = token.role as string
      }
      return session
    }
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60 * 1000
  },
  pages: {
    signIn: '/login',
    error: '/login',
    newUser: '/signup',
    signOut: '/login'
  },
  secret: process.env.AUTH_SECRET
})