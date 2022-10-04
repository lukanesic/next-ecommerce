import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { comaprePasswords } from './../../../lib/passwords'
import { connectToDbMong } from '../../../lib/db'
import User from '../../../models/userModel'

export default NextAuth({
  session: {
    jwt: true,
    secret: process.env.SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.address = user.address
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.address = token.address
      session.user.role = token.role
      session.user.id = token.id

      return session
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials

        await connectToDbMong()
        const user = await User.findOne({ email: email })

        if (!user) {
          throw new Error('Email not found')
          return
        }

        const isEqual = await comaprePasswords(password, user.password)
        if (!isEqual) {
          throw new Error('Incorect password')
          return
        }

        return {
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
          id: user._id,
        }
      },
    }),
  ],
})
