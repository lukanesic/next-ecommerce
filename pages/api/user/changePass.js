import { connectDatabase } from '../../../lib/db'
import { hashPassword, comaprePasswords } from './../../../lib/passwords'
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return
  }

  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ msg: 'You are not auth!' })
    return
  }

  const client = await connectDatabase()
  const userCollection = client.db('ecomm').collection('users')
  const user = await userCollection.findOne({ email: session.user.email })

  if (!user) {
    res.status(404).json({ msg: 'User not found!' })
    client.close()
    return
  }

  const newPassword = req.body.passwordData.newP
  const oldPassword = req.body.passwordData.oldP
  const currentPassword = user.password

  const passAreEqual = await comaprePasswords(oldPassword, currentPassword)

  if (!passAreEqual) {
    res.status(403).json({ msg: 'Wrong Password' })
    client.close()
    return
  }

  const newHasPassword = await hashPassword(newPassword)

  const result = await userCollection.updateOne(
    { email: session.user.email },
    { $set: { password: newHasPassword } }
  )

  client.close()
  res.status(200).json({ msg: 'Password updated' })
}

export default handler
