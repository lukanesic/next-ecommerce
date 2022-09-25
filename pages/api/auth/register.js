import { hashPassword } from './../../../lib/passwords'

import { connectToDbMong } from './../../../lib/db'
import User from './../../../models/userModel'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { credentials } = req.body
    const { name, email, password, address, role } = credentials

    await connectToDbMong()
    const existingUser = await User.findOne({ email: email })

    // Validacija koja ne mora striktno da bude na serveru
    // ona je ista i na clientu, ali eto ovde je on resio da je pise. Ja cu to na clientu

    if (existingUser) {
      res.status(400).json({ message: 'User already exist' })
      return
    }

    const hashPass = await hashPassword(password)
    const result = await User.create({
      name: name,
      email: email,
      password: hashPass,
      role: 'customer',
      address: address,
    })

    res.status(201).json({ message: 'User is created.' })
    return result
  }
}

export default handler
