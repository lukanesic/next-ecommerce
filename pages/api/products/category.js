import { connectToDbMong } from '../../../lib/db'
import Product from './../../../models/productModel'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    await connectToDbMong()
    const data = await Product.find({ category: req.query.params })
    res.status(200).json(data)
  }
}

export default handler
