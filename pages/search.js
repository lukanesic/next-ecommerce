import React from 'react'
import MainLayout from './../layout/MainLayout'
import { useSelector } from 'react-redux'

const Search = () => {
  const { searchKeyword } = useSelector((state) => state.search)

  // filtriranje proizvoda kroz ovu rec i prikazivanje
  console.log(searchKeyword)
  return (
    <MainLayout>
      <h1>{searchKeyword && searchKeyword}</h1>
    </MainLayout>
  )
}

export default Search
