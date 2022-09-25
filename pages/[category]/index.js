import React, { useEffect } from 'react'
import MainLayout from '../../layout/MainLayout'
import { AnimatePresence, motion } from 'framer-motion'
import Box from '../../components/Box'

const Category = ({ data, path }) => {
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
          <h1>{path && path}</h1>
          <h4>Collection</h4>
        </div>

        {/* iz baze */}
        <div className='home-box-container'>
          {data.map((product) => (
            <Box
              link={`${path}/${product.href}`}
              name={product.name}
              price={product.price}
              image={product.image}
              key={product._id}
            />
          ))}
        </div>
      </motion.div>
    </MainLayout>
  )
}

export async function getStaticPaths() {
  const getCategoryPath = async () => {
    const request = await fetch(`http://localhost:3000/api/products/all`)
    const response = await request.json()
    return response
  }

  const data = await getCategoryPath()
  const paths = await data.map((product) => {
    return {
      params: { category: product.category },
    }
  })
  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const { params } = context
  const getCategory = async () => {
    const request = await fetch(
      `http://localhost:3000/api/products/category?params=${params.category}`,
      params
    )
    const response = await request.json()
    return response
  }

  const data = await getCategory()

  return {
    props: {
      data,
      path: params.category,
    },
  }
}

export default Category
