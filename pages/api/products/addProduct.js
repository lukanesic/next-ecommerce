import { connectToDbMong } from '../../../lib/db'
import Product from '../../../models/productModel'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await connectToDbMong()
    const data = await Product.create({
      user: req.body.user,
      name: req.body.title,
      category: req.body.category,
      href: req.body.href,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
      about: req.body.about,
      seoKey: req.body.seoKey,
      searchKey: req.body.searchKey,
    })

    res.status(200).json({ msg: 'arived', data })
  }
  return
}

export default handler
