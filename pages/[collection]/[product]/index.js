import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import MainLayout from '../../../layout/MainLayout'

const Product = () => {
  return (
    <MainLayout>
      <div className='product-container'>
        <div style={{ width: 300, height: 300, background: '#000' }} />
        <div className='p-c-info'>
          {/* <h2>{product.name}</h2> */}
          <h2>Product Name</h2>
          <div className='stars'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          {/* <h3>${product.price}</h3> */}
          <h3>Product Price</h3>
          {/* <p>{product.description1}</p> */}
          <p>Product Description</p>
          <a href='#'>Shop the entire collection</a>

          {/* <button onClick={() => openAddCart(product)}>Add to cart</button> */}
          <button>Add to cart</button>
          <p>Product Description 2</p>
        </div>
      </div>
    </MainLayout>
  )
}

export default Product

// BAZA
// export async function getStaticProps(context) {
//     const { params } = context

//     let data

//     try {
//       const q = query(
//         collection(db, 'products'),
//         where('link', '==', params.product)
//       )
//       const querySnapshot = await getDocs(q)
//       querySnapshot.forEach((doc) => {
//         return (data = { ...doc.data(), id: doc.id })
//       })
//     } catch (error) {
//       console.log(error)
//     }

//     return {
//       props: {
//         product: data,
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
//         params: { collection: product.collection, product: product.link },
//       }
//     })

//     return {
//       paths: paths,
//       fallback: false,
//     }
//   }
