import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import MainLayout from '../../../layout/MainLayout'
import { motion } from 'framer-motion'

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

  console.log(data)
  console.log(path)

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
          <h1>Product Name</h1>
          <h4>Collection</h4>
        </div>

        <div className='product-container'>
          {/* Placeholder dok ne dobijem pravu sliku */}
          <div
            className='img-placeholder'
            style={{
              height: 400,
              width: 400,
              background: '#000',
              margin: '0 auto',
            }}
          />
          <div className='p-info'>
            <p className='description d1'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ab
              rem ut perferendis aut veniam!
            </p>
            <p className='description d2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              maiores veritatis accusamus, molestiae asperiores sequi.
            </p>
            <h3>Price</h3>
            <h3>$414</h3>
            <button
              onClick={() =>
                handleAddToCart({
                  name: 'Test',
                  price: 'Test Price',
                  description1: 'Test',
                  description2: 'Test',
                })
              }
            >
              Add To Cart
            </button>
          </div>
        </div>
      </motion.div>

      <AddToCartSide
        name={'Test'}
        price={'Test'}
        collection={'Test'}
        show={showSideCart}
        setShow={setShowSideCart}
        image={'product.image'}
        description1={'product.description1'}
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
