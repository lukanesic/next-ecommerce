import React, { useEffect, useState } from 'react'
import MainLayout from './../../layout/MainLayout'
import { useSelector } from 'react-redux'

import Box from './../../components/Box'

const Search = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { searchKeyword } = useSelector((state) => state.search)

  useEffect(() => {
    const fetchProducts = async () => {
      const request = await fetch('/api/products/all')
      const response = await request.json()
      setProducts(response)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  const searchKey = searchKeyword.toLowerCase()

  const filteredProducts = products
    .map((product) => product)
    .filter((product) => product.href.includes(searchKey))

  return (
    <MainLayout>
      <div className='search-heading'>
        <h4>{!searchKeyword && 'Search for products!'}</h4>
        <h1>{searchKeyword && searchKeyword}</h1>
        <h4>{searchKeyword && 'Your results'}</h4>
      </div>

      {/* Motion  */}
      {loading && (
        <div className='home-box-container'>
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <Box key={item} placeholder />
          ))}
        </div>
      )}

      {Object.keys(products).length === 0 && ''}

      {/* Motion */}
      {Object.keys(filteredProducts).length === 0 && (
        <h2
          style={{ textAlign: 'center', fontSize: '30px', fontWeight: '400' }}
        >
          No items found. Try Again
        </h2>
      )}

      <div className='home-box-container'>
        {filteredProducts.map((product) => (
          <Box
            key={product._id}
            name={product.name}
            price={product.price}
            link={`${product.collection}/${product.href}`}
            image={product.image}
            id={product._id}
          />
        ))}
      </div>
    </MainLayout>
  )
}

export default Search
