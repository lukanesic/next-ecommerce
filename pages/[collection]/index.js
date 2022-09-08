import React, { useEffect } from 'react'
import MainLayout from './../../layout/MainLayout'
import { AnimatePresence, motion } from 'framer-motion'
import Box from './../../components/Box'

// const fetchCollection = async () => {
//   const req = await fetch('/api/products')

//   const res = await req.json()

//   console.log(res)
// }

const Collection = () => {
  // useEffect(() => {
  //   fetchCollection()
  // }, [])

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
        </div>
      </motion.div>
    </MainLayout>
  )
}

export default Collection

// MongoDB baza
// export async function getStaticProps(context) {
//   const { params } = context
// }

// export async function getStaticProps(context) {
//     const { params } = context

//     let data = []

//     try {
//       const q = query(
//         collection(db, 'products'),
//         where('collection', '==', params.collection)
//       )
//       const querySnapshot = await getDocs(q)
//       querySnapshot.forEach((doc) => {
//         return data.push({ ...doc.data(), id: doc.id })
//       })
//     } catch (error) {
//       console.log(error)
//     }

//     return {
//       props: {
//         data: { data },
//         params: params.collection,
//       },
//     }
//   }

//   export async function getStaticPaths() {
//     let products

//     try {
//       const productRef = collection(db, 'products')
//       const data = await getDocs(productRef)
//       products = data.docs.map((product) => ({
//         ...product.data(),
//         id: product.id,
//       }))
//     } catch (error) {
//       console.log(error)
//     }

//     const paths = products.map((product) => {
//       return {
//         params: { collection: product.collection },
//       }
//     })

//     return {
//       paths: paths,
//       fallback: false,
//     }
//   }
