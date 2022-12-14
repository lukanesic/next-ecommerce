import React, { useEffect } from 'react'
import MainLayout from '../../layout/MainLayout'
import { AnimatePresence, motion } from 'framer-motion'
import Box from '../../components/Box'
import { fetchAll, fetchCategory } from '../../lib/data'

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
  const response = await fetchAll()
  const data = JSON.parse(JSON.stringify(response))

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
  const response = await fetchCategory(params.category)
  const data = JSON.parse(JSON.stringify(response))

  return {
    props: {
      data,
      path: params.category,
    },
  }
}

export default Category
