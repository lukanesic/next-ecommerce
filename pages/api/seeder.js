import { connectToDbMong } from '../../lib/db'
import { products } from './../../models/testProducts'
import { users } from '../../models/testUsers'

import User from '../../models/userModel'
import Product from '../../models/productModel'

const handler = async (req, res) => {
  await connectToDbMong()

  const user = await User.insertMany(users)
  const adminUser = await user[0]._id

  const sampleProducts = products.map((product) => {
    return {
      ...product,
      user: adminUser,
    }
  })

  await Product.insertMany(sampleProducts)
}

export default handler
