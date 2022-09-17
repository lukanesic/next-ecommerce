import React, { useRef, useState } from 'react'
import MainLayout from './../../layout/MainLayout'
import Form from './../../components/Form'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

const createUser = async (credentials) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      credentials,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  if (!response) {
    throw new Error('Something went wrong!')
  }

  return data
}

const Register = () => {
  const [error, setError] = useState()
  const enteredName = useRef()
  const enteredEmail = useRef()
  const enteredPassword = useRef()
  const confirmPassword = useRef()
  const enteredAddress = useRef()

  const router = useRouter()

  const resetForm = () => {
    enteredName.current.value = ''
    enteredEmail.current.value = ''
    enteredPassword.current.value = ''
    confirmPassword.current.value = ''
    enteredAddress.current.value = ''

    setError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (enteredPassword.current.value.length < 6) {
      setError('Must contain more than 6 characters!')
      return
    }

    if (enteredPassword.current.value !== confirmPassword.current.value) {
      setError('Passwords dont match. Please try again')
      return
    }

    const credentials = {
      name: enteredName.current.value,
      email: enteredEmail.current.value,
      password: enteredPassword.current.value,
      address: enteredAddress.current.value,
      role: 'customer',
    }

    try {
      const request = await createUser(credentials)
      console.log(request)

      if (request.message === 'User already exist') {
        setError(request.message)
        return
      }

      resetForm()
      router.replace('/login')
    } catch (error) {
      console.log(error)
      return
    }
  }

  return (
    <MainLayout>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className='formdiv'>
          <label htmlFor='name'>Full Name</label>
          <input
            type='name'
            name='name'
            id='name'
            placeholder='Full Name'
            required
            ref={enteredName}
            className='inputLabel'
          />
        </div>

        <div className='formdiv'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            required
            ref={enteredEmail}
            className='inputLabel'
          />
        </div>

        <div className='formdiv'>
          <label htmlFor='email'>Address</label>
          <input
            type='text'
            name='address'
            id='address'
            placeholder='Address'
            required
            ref={enteredAddress}
            className='inputLabel'
          />
        </div>

        <div className='formdiv'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            required
            ref={enteredPassword}
            className='inputLabel'
          />
        </div>

        {error === 'Must contain more than 6 characters!' && <li>{error}</li>}

        <div className='formdiv'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            placeholder='Confirm Password'
            required
            ref={confirmPassword}
            className='inputLabel'
          />
        </div>

        {error === 'Passwords dont match. Please try again' && <li>{error}</li>}

        <button>Sign up</button>

        <div className='alternate'>
          <h4>{`Already have an account?`}</h4>
          <Link href='/login'>Login here.</Link>
        </div>
      </Form>
    </MainLayout>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default Register
