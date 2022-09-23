import { connectDatabase } from '../../../lib/db'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).json({ msg: 'error' })
  } else {
    const client = await connectDatabase()
    const db = client.db('ecomm')
    const userCollection = db.collection('user')

    const order = req.body.order
    const email = req.body.order.email

    const update = await userCollection.updateOne(
      { email: email },
      { $set: { orderHistory: { order } } }
    )

    res.status(200).json({ msg: 'Ok' })
    client.close()
    return update

    // Svakako moram da vrsim proveru da li orderHistory postoji
    // Ukoliko postoji ja nadodajem na vec napravljeni niz
    // U suprotnom pravim orderHistory niz sa objektima
  }
}

export default handler
