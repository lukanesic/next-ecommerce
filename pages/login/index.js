import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import MainLayout from '../../layout/MainLayout'
import Form from '../../components/Form'

import Link from 'next/link'

const Login = () => {
  const [error, setError] = useState()

  const enteredEmail = useRef()
  const enteredPassword = useRef()

  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('forma')
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

export default Login
