import React, { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import MainLayout from '../../layout/MainLayout'
import Form from '../../components/Form'
import Summary from '../../components/Checkout/Summary'
import Link from 'next/link'

const Checkout = () => {
  const { data: session } = useSession()
  console.log(session)

  const [error, setError] = useState()
  const enteredName = useRef()
  const enteredEmail = useRef()
  const enteredAddress = useRef()

  const router = useRouter()

  const resetForm = () => {
    enteredName.current.value = ''
    enteredEmail.current.value = ''
    enteredAddress.current.value = ''
    setError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <MainLayout>
      <Form onSubmit={() => console.log('Sub')}>
        {/* {!session && (
          <>
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
              <label htmlFor='address'>Address</label>
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
          </>
        )} */}

        {!session && (
          <div className='profileH'>
            <h1>You must be logged in to continue!</h1>
            <Link href='/login'>
              <button>Login</button>
            </Link>
          </div>
        )}

        {session && (
          <>
            <div className='profileH'>
              <h1>{session && session.user.name}</h1>
              <h4>{session && session.user.email}</h4>
            </div>
            <Summary onSubmit={handleSubmit} />
          </>
        )}
      </Form>
    </MainLayout>
  )
}

// export const getServerSideProps = async (context) => {
//   const session = await getSession({ req: context.req })

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: { session },
//   }
// }

export default Checkout
