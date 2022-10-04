import React, { useEffect, useState } from 'react'

import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import MainLayout from '../../layout/MainLayout'
import Form from '../../components/Form'
import OrderHistory from '../../components/OrderHistory'
import AddForm from '../../components/AddForm'

const Admin = () => {
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [accountTab, setAccountTab] = useState(0)
  const [orders, setOrders] = useState()
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.replace('/')
    }

    if (session && session.user.role !== 'admin') {
      router.replace('/account')
    }
  }, [session])

  useEffect(() => {
    const fetchOrders = async () => {
      const request = await fetch('/api/orders/all')
      const response = await request.json()
      setOrders(response)
    }

    fetchOrders()
  }, [])

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
          Add Product
        </h3>
        <h3
          onClick={() => setAccountTab(1)}
          className={accountTab === 1 ? 'active-tab' : ''}
        >
          Order History
        </h3>
      </div>

      {/* Forma koja ce da se odnosi na dodavanje proizvoda */}
      {/* Zapamti da se doavanje slika na monbodb odigrava drugacije tako da to je sledece sto moras da uradis */}
      {accountTab === 0 && <AddForm />}

      {/* OrderHistory ali svih mogucih porudzbina. Pored products i users, mora da postoji i orderHistory na bazi */}
      {/* Kad customer napravi porudzbinu, ta porudzbina mora da ide na dva mesta. U njegov licni objekat, i u db orderHistory */}
      {/* To ce da bude evidencija za admina */}
      {accountTab === 1 && (
        <div className='orders-wrapper'>
          {orders &&
            orders.map((order) => (
              <OrderHistory order={order} key={order._id} admin />
            ))}
        </div>
      )}
    </MainLayout>
  )
}

export default Admin

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
