import { connectToDbMong } from '../../../lib/db'
import { hashPassword, comaprePasswords } from './../../../lib/passwords'
import { getSession } from 'next-auth/react'
import User from '../../../models/userModel'

const handler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return
  }

  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ msg: 'You are not auth!' })
    return
  }

  await connectToDbMong()
  const user = await User.findOne({ email: session.user.email })

  if (!user) {
    res.status(404).json({ msg: 'User not found!' })
    return
  }

  const newPassword = req.body.passwordData.newP
  const oldPassword = req.body.passwordData.oldP
  const currentPassword = user.password

  const passAreEqual = await comaprePasswords(oldPassword, currentPassword)

  if (!passAreEqual) {
    res.status(403).json({ msg: 'Wrong Password' })
    return
  }

  const newHasPassword = await hashPassword(newPassword)

  const result = await User.updateOne(
    { email: session.user.email },
    { $set: { password: newHasPassword } }
  )

  res.status(200).json({ msg: 'Password updated' })
}

export default handler
