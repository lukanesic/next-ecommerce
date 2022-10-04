import React, { useEffect, useRef, useState } from 'react'
import MainLayout from './../../layout/MainLayout'
import { getSession, useSession } from 'next-auth/react'
import Form from './../../components/Form'
import { useRouter } from 'next/router'
import OrderHistory from './../../components/OrderHistory'
import Image from 'next/image'

const changePassword = async (passwordData) => {
  const response = await fetch('/api/user/changePass', {
    method: 'PATCH',
    body: JSON.stringify({ passwordData }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  return data
}

const Account = () => {
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [accountTab, setAccountTab] = useState(0)
  const [orders, setOrders] = useState([])

  const router = useRouter()
  const currPass = useRef()
  const newPass = useRef()
  const { data: session, status } = useSession()

  // fetch poziv za odredjenog usera pomocu id-a.
  useEffect(() => {
    const fetchOrders = async () => {
      const request = await fetch(
        `/api/orders/userOrder?params=${session.user.id}`
      )
      const response = await request.json()

      setOrders(response)
    }

    fetchOrders()
  }, [])

  const resetForm = () => {
    currPass.current.value = ''
    newPass.current.value = ''
    setError()
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()

    const currentPassword = currPass.current.value
    const newPassword = newPass.current.value

    const passwordData = {
      oldP: currentPassword,
      newP: newPassword,
    }

    try {
      const response = await changePassword(passwordData)

      if (response.msg === 'Wrong Password') {
        setError(response.msg)
      } else if (response.msg === 'User not found!') {
        setError(response.msg)
      }

      if (response.msg === 'Password updated') {
        setSuccess('Successfully changed password!')
        router.replace('/')
      }

      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <MainLayout>
      <div className='profileH'>
        <h1>{session && session.user.name}</h1>
        <h4>{session && session.user.email}</h4>
      </div>

      <div className='account-tab'>
        <h3
          onClick={() => setAccountTab(0)}
          className={accountTab === 0 ? 'active-tab' : ''}
        >
          Change Password
        </h3>
        <h3
          onClick={() => setAccountTab(1)}
          className={accountTab === 1 ? 'active-tab' : ''}
        >
          Your Order History
        </h3>
      </div>

      {accountTab === 0 && (
        <Form onSubmit={handleChangePassword}>
          <div className='formdiv'>
            <label htmlFor='email'> Current Password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              ref={currPass}
              required
              className={!error ? 'inputLabel' : 'inputLabelError'}
            />

            {error && <li className='liErr'>{error}</li>}
          </div>

          <div className='formdiv'>
            <label htmlFor='email'> New Password</label>
            <input
              type='password'
              name='password'
              id='newPassword'
              placeholder='Password'
              ref={newPass}
              required
            />
          </div>

          {!error ? (
            <button>Change</button>
          ) : (
            <button onClick={(e) => resetForm(e)}>Try Again</button>
          )}
        </Form>
      )}

      {accountTab === 1 && (
        <div className='orders-wrapper'>
          {orders &&
            orders.map((order) => (
              <OrderHistory order={order} key={order._id} account />
            ))}
        </div>
      )}
    </MainLayout>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default Account
