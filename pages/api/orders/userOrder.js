import { connectToDbMong } from '../../../lib/db'
import { Order } from '../../../models/orderModel'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    await connectToDbMong()
    const data = await Order.find({ customer: req.query.params })
    res.status(200).json(data)
  }
  return
}

export default handler
