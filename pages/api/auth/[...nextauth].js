import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { comaprePasswords } from './../../../lib/passwords'
import { connectDatabase } from './../../../lib/db'

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials

        const client = await connectDatabase()
        const db = client.db('ecomm').collection('users')
        const user = await db.findOne({ email: email })

        if (!user) {
          throw new Error('Email not found')
          client.close()
          return
        }

        const isEqual = await comaprePasswords(password, user.password)
        if (!isEqual) {
          throw new Error('Incorect password')
          client.close()
          return
        }

        client.close()

        return {
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
})
