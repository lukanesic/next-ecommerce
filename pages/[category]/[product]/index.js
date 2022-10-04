import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import MainLayout from '../../../layout/MainLayout'
import { motion } from 'framer-motion'

import Image from 'next/image'

import { useDispatch } from 'react-redux'
import { addToCart } from '../../../redux/slices/cartSlice'

import AddToCartSide from '../../../components/Menus/AddToCartSide'
import { fetchAll, fetchProduct } from '../../../lib/data'

const Product = ({ data, path }) => {
  const dispatch = useDispatch()
  const [showSideCart, setShowSideCart] = useState(false)

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    setShowSideCart(!showSideCart)
  }

  const product = data[0]

  return (
    <MainLayout>
      <motion.div
        className='collection'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className='collection-heading'>
          {/* Dynamic */}
          {/* <h1>{collectionName}</h1> */}
          <h1>{product.name}</h1>
          <h4>{product.category.toUpperCase()}</h4>
        </div>
        <div className='product-container'>
          {/* Placeholder dok ne dobijem pravu sliku */}
          <div
            className='img-placeholder'
            style={{
              height: 400,
              width: 400,
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              layout='fill'
              objectFit='center'
            />
          </div>
          <div className='p-info'>
            <p className='description d1'>{product.about}</p>
            <p className='description d2'>{product.description}</p>
            <h3>Price</h3>
            <h3>${product.price}</h3>
            <button
              onClick={() =>
                handleAddToCart({
                  name: product.name,
                  price: product.price,
                  about: product.about,
                  description: product.description,
                  _id: product._id,
                  image: product.image,
                })
              }
            >
              Add To Cart
            </button>
          </div>
        </div>
      </motion.div>

      <AddToCartSide
        name={product.name}
        price={product.price}
        category={product.category}
        show={showSideCart}
        setShow={setShowSideCart}
        image={product.image}
        description1={product.about}
      />
    </MainLayout>
  )
}

export default Product

export async function getStaticPaths() {
  const response = await fetchAll()
  const data = JSON.parse(JSON.stringify(response))

  const paths = await data.map((product) => {
    return {
      params: {
        category: product.category,
        product: product.href,
      },
    }
  })
  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const { params } = context

  const response = await fetchProduct(params.product)
  const data = JSON.parse(JSON.stringify(response))

  return {
    props: {
      data,
      path: params.product,
    },
  }
}
