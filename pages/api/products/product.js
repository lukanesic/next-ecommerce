import { connectDatabase } from '../../../lib/db'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectDatabase()
    const db = client.db('ecomm')
    const data = await db
      .collection('products')
      .find({ href: req.query.params })
      .toArray()
    res.json(data)
    client.close()
  }
}

export default handler
