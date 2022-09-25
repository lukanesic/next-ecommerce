import { connectToDbMong } from '../../../lib/db'
import { Order } from '../../../models/orderModel'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).json({ msg: 'error' })
  } else {
    const customerId = req.body.order.user.id
    const order = req.body.order.cart

    console.log(order)
    await connectToDbMong()

    const result = await Order.create({
      customer: customerId,
      orderItems: order,
    })

    res.status(201).json({ msg: 'Order Created' })
    return result
  }
}

export default handler
