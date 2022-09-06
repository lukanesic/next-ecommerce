import React from 'react'
import MainLayout from './../layout/MainLayout'
import { useSelector } from 'react-redux'

const Search = () => {
  const { searchKeyword } = useSelector((state) => state.search)

  console.log(searchKeyword)
  return (
    <MainLayout>
      <h1>Hello</h1>
    </MainLayout>
  )
}

export default Search
