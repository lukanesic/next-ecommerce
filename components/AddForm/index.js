import React, { useRef, useState } from 'react'

const AddForm = () => {
  const [feedback, setFeedback] = useState(false)

  const title = useRef()
  const category = useRef()
  const subcategory = useRef()
  const url = useRef()
  const image = useRef()
  const description = useRef()
  const about = useRef()
  const keyWords = useRef()
  const spec1 = useRef()
  const spec2 = useRef()
  const spec3 = useRef()
  const spec4 = useRef()
  const spec5 = useRef()

  const resetForm = () => {
    title.current.value = ''
    category.current.value = ''
    subcategory.current.value = ''
    url.current.value = ''
    image.current.value = ''
    description.current.value = ''
    about.current.value = ''
    keyWords.current.value = ''

    setTimeout(() => {
      setFeedback(false)
    }, [10000])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const searchKey = keyWords.current.value.replace(/,/g, ' ')

    const product = {
      title: title.current.value,
      category: category.current.value,
      subcategory: subcategory.current.value,
      url: url.current.value,
      image: image.current.value,
      description: description.current.value,
      about: about.current.value,
      seoKey: keyWords.current.value,
      searchKey: searchKey,
    }

    try {
      const response = await fetch('/api/products/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })

      const data = await response.json()
      console.log(data)

      if (data.msg === 'arived') {
        resetForm()
        // Feedback da je poruka poslata
        setFeedback(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className='add-product-form' onSubmit={(e) => handleSubmit(e)}>
      <label>Title</label>
      <input type='text' required className='inputLabel' ref={title} />

      <label>Category</label>
      <input type='text' required className='inputLabel' ref={category} />

      <label>Link</label>
      <input type='text' required className='inputLabel' ref={url} />

      <label>Image</label>
      <input type='text' required className='inputLabel' ref={image} />

      <label>Description Proizvoda</label>
      <input type='text' required className='inputLabel' ref={description} />

      <label>About</label>
      <input type='text' required className='inputLabel' ref={about} />

      <label>SEO Keywords</label>
      <input type='text' required className='inputLabel' ref={keyWords} />

      {!feedback && <button>Add Product</button>}
      {feedback && <button className='green'>Product added successfuly</button>}
    </form>
  )
}
export default AddForm
