import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import MainLayout from '../../../layout/MainLayout'
import { motion } from 'framer-motion'

import Image from 'next/image'

import { useDispatch } from 'react-redux'
import { addToCart } from '../../../redux/slices/cartSlice'

import AddToCartSide from '../../../components/Menus/AddToCartSide'

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
          <h4>{product.collection.toUpperCase()}</h4>
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
                  description1: product.about,
                  description2: product.description,
                  id: product._id,
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
        collection={product.collection}
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
  const getCollectionPath = async () => {
    const request = await fetch(`http://localhost:3000/api/products/all`)
    const response = await request.json()
    return response
  }

  const data = await getCollectionPath()
  const paths = await data.map((product) => {
    return {
      params: { collection: product.collection, product: product.href },
    }
  })
  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const { params } = context
  const getCollection = async () => {
    const request = await fetch(
      `http://localhost:3000/api/products/product?params=${params.product}`,
      params
    )
    const response = await request.json()
    return response
  }

  const data = await getCollection()

  return {
    props: {
      data,
      path: params.product,
    },
  }
}
