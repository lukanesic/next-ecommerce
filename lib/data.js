import { connectToDbMong } from './../lib/db'

import Product from './../models/productModel'

export const fetchAll = async () => {
  await connectToDbMong()
  const data = await Product.find({})
  return data
}

export const fetchFeatured = async () => {
  await connectToDbMong()
  const data = await Product.find({ featured: true })
  return data
}

export const fetchCategory = async (category) => {
  await connectToDbMong()
  const data = await Product.find({ category: category })
  return data
}

export const fetchProduct = async (href) => {
  await connectToDbMong()
  const data = await Product.find({ href: href })
  return data
}
