import { connectDatabase } from '../../../lib/db'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const client = await connectDatabase()
    const db = client.db('ecomm')
    const data = db.collection('products').find({ collection: 'alaro' })

    res.json(data)
  }
}

export default handler
