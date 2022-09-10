import React, { useEffect } from 'react'
import MainLayout from './../../layout/MainLayout'
import { AnimatePresence, motion } from 'framer-motion'
import Box from './../../components/Box'

const params = 'alaro'

const testCall = async () => {
  const request = await fetch(`/api/products/collection?params=${params}`)
  const response = await request.json()

  const data = response.map((product) => product.collection)
  console.log(data)
}

const Collection = ({ data }) => {
  console.log(data)
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
          <h1>Collection Name</h1>
          <h4>Collection</h4>
        </div>

        {/* iz baze */}
        {/* {data.data.map((product) => (
          <div className='home-box-container' key={product.id}>
            <Box
              link={`${params}/${product.link}`}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          </div>
        ))} */}
        <div className='home-box-container'>
          <Box
            link={'alaro/alaro-sofa'}
            name={'Alaro Sofa'}
            price={2445}
            // image={alarosofa}
          />
          <Box
            link={'alaro/alaro-lounge-chair'}
            price={1695}
            name={'Alaro Chair'}
          />
          <Box
            link={'alaro/alaro-ottoman'}
            name={'Alaro Ottoman'}
            price={795}
          />

          {/* <button onClick={() => testCall()}>Call</button> */}
        </div>
      </motion.div>
    </MainLayout>
  )
}

export const getStaticProps = async (context) => {
  const getCollection = async () => {
    const { params } = context

    const request = await fetch(
      `http://localhost:3000/api/products/collection?params=${params.collection}`,
      params
    )
    const response = await request.json()
    return response
  }

  const data = await getCollection()

  return {
    props: {
      data,
    },
  }
}

export async function getStaticPaths() {
  const getCollectionPath = async () => {
    const request = await fetch(`http://localhost:3000/api/products/collection`)
    const response = await request.json()
    return response
  }

  const data = await getCollectionPath()
  const paths = await data.map((product) => {
    return {
      params: { collection: product.collection },
    }
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export default Collection
