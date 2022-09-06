import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GrSearch } from 'react-icons/gr'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { addKeyword } from '../../../redux/slices/searchSlice'
import { useRouter } from 'next/router'

const Search = ({ open, setOpen }) => {
  const [searchVal, setSearchVal] = useState('')

  console.log(searchVal)

  const dispatch = useDispatch()
  const router = useRouter()

  const handleSearch = () => {
    dispatch(addKeyword(searchVal))
    router.replace('/search')
  }

  useEffect(() => {
    if (open) {
      const width = document.body.clientWidth
      document.body.style.overflowY = 'hidden'
      document.body.style.width = `${width}px`
    } else {
      document.body.style.overflowY = 'visible'
      document.body.style.width = `auto`
    }

    return () => {
      document.body.style.overflowY = 'visible'
      document.body.style.width = `auto`
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className='search-drop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => setOpen(!open)}
          />
          <motion.div
            className='search'
            initial={{ opacity: 0, height: '10vh' }}
            animate={{ opacity: 1, height: '40vh' }}
            exit={{ opacity: 0, height: '10vh' }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className='search-content'>
              <input
                type='text'
                placeholder='Search for ..'
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              {/* <Link href='/search-results'>
                <GrSearch className='search-i' />
              </Link> */}
              <GrSearch className='search-i' onClick={() => handleSearch()} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Search
