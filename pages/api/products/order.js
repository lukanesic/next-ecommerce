import { connectDatabase } from '../../../lib/db'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).json({ msg: 'error' })
  } else {
    const client = await connectDatabase()
    const db = client.db('ecomm')
    const ordersCollection = db.collection('orders')

    const customer = req.body.order.customer
    const order = req.body.order.bag
    console.log(order)

    const result = await ordersCollection.insertOne({ customer, order })

    res.status(200).json({ orderId: result.insertedId })
    client.close()
    return result
  }
}

export default handler
