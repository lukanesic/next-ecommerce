import { hashPassword } from './../../../lib/passwords'
import { connectDatabase } from './../../../lib/db'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { credentials } = req.body
    const { name, email, password } = credentials

    // Validacija koja ne mora striktno da bude na serveru
    // ona je ista i na clientu, ali eto ovde je on resio da je pise. Ja cu to na clientu

    const client = await connectDatabase()
    const db = client.db('ecomm')
    const userCollection = db.collection('users')

    const existingUser = await userCollection.findOne({ email: email })

    if (existingUser) {
      res.status(400).json({ message: 'User already exist' })
      client.close()
      return
    }

    const hashPass = await hashPassword(password)
    const result = await userCollection.insertOne({
      name: name,
      email: email,
      password: hashPass,
    })

    res.status(201).json({ message: 'User is created.' })
    client.close()
    return result
  }
}

export default handler
