import { connectToDbMong } from './../lib/db'

import Order from './../models/orderModel'

export const fetchOrders = async () => {
  await connectToDbMong()

  const data = await Order.find({})
  return data
}
