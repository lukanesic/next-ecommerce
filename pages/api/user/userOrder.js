import { connectDatabase } from '../../../lib/db'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).json({ msg: 'error' })
  } else {
    const client = await connectDatabase()
    const db = client.db('ecomm')
    const userCollection = db.collection('user')
    const findUser = await userCollection.findOne({ email: email })

    console.log(req.body)

    // const result = await ordersCollection.insertOne({ customer, order })

    // res.status(200).json({ orderId: result.insertedId })
    // client.close()
    // return result
  }
}

export default handler
