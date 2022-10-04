import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import MainLayout from '../../layout/MainLayout'
import Form from '../../components/Form'

import { signIn, getSession } from 'next-auth/react'

import Link from 'next/link'

const Login = ({ path }) => {
  const [error, setError] = useState()

  const enteredEmail = useRef()
  const enteredPassword = useRef()

  const router = useRouter()

  const prevPath = path.split('/').pop() === 'checkout'

  const resetForm = () => {
    enteredEmail.current.value = ''
    enteredPassword.current.value = ''

    setError()
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const email = enteredEmail.current.value
    const password = enteredPassword.current.value

    if (password.length < 6) {
      setError('Password must contain more than 6 characters!')
      return
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result.error) {
        setError(result.error)
        return
      }

      resetForm()
      router.replace(`${prevPath ? 'checkout' : '/'}`)

      console.log(result)
    } catch (error) {
      console.log(error)
      setError()
    }

    // if (result.error === 'EmailError') {
    //   setEmailError('Email not found')
    //   return
    // } else if (result.error === 'PasswordError') {
    //   setPassError('Invalid password')
    //   return
    // } else if (result.error === null) {
    //   router.replace('/')
    // }
  }
  return (
    <MainLayout>
      <Form onSubmit={(e) => handleLogin(e)}>
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

        <button>Login</button>

        <div className='alternate'>
          <h4>{`Don't have account?`}</h4>
          <Link href='/register'>Register here.</Link>
        </div>
      </Form>
    </MainLayout>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })
  const path = context.resolvedUrl

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session, path },
  }
}

export default Login
