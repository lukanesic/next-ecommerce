import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { useSelector, useDispatch } from 'react-redux'
import { resetCart } from '../../redux/slices/cartSlice'

import MainLayout from '../../layout/MainLayout'
import Form from '../../components/Form'
import Summary from '../../components/Checkout/Summary'
import Link from 'next/link'
import { ObjectId } from 'bson'

const createOrder = async (order) => {
  const req = await fetch('/api/products/order', {
    method: 'POST',
    body: JSON.stringify({
      order,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const res = await req.json()
  return res
}

const addUserOrder = async (order) => {
  const req = await fetch('/api/user/userOrder', {
    method: 'POST',
    body: JSON.stringify({
      order,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const res = await req.json()
  return res
}

const Checkout = () => {
  const { data: session } = useSession()

  const { cart, cartTotalAmonut, cartTotalQuantity } = useSelector(
    (state) => state.cart
  )

  const dispatch = useDispatch()

  const [error, setError] = useState(false)
  const enteredName = useRef()
  const enteredEmail = useRef()
  const enteredAddress = useRef()

  const router = useRouter()

  // Ako stavim payment sistem pre nego sto proverim da li se objekti na bazi prave, samo cu sebi da napravim problem.
  // Radi bez payment sistema za sad, vidi je l stize sve gde treba
  // Potrebno je da ide order i kod orderHistory bazi, kao i kod usera. Potrebno je da imaju isti id. Tako da se prov pravi cela baza, gde se dobija dobar id, vracam to i tek onda saljem kod usera koji je napravio porudzbinu
  const handleSubmit = async (e) => {
    e.preventDefault()

    const order = {
      bag: [...cart],
      customer: {
        name: session.user.name,
        email: session.user.email,
        address: session.user.address,
      },
    }

    try {
      const req = await createOrder(order)
      if (req.msg !== 'error') {
        const userOrderObj = {
          bag: [...cart],
          orderId: req.orderId,
          email: session.user.email,
        }
        const userReq = await addUserOrder(userOrderObj)

        if (userReq.msg !== 'error') {
          router.replace('/')
          dispatch(resetCart())
        } else {
          setError(true)
        }
      } else {
        setError(true)
        return
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <MainLayout>
      <Form onSubmit={handleSubmit}>
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
            <Summary
              onSubmit={handleSubmit}
              cart={cart}
              cartTotalAmonut={cartTotalAmonut}
              cartTotalQuantity={cartTotalQuantity}
            />
          </>
        )}

        {/* Error handling componenta potencijalna */}
        {error === true && (
          <>
            <h4
              style={{
                margin: '2rem 0',
                display: 'block',
                textAlign: 'center',
              }}
            >
              Something went wrong! Try again later.
            </h4>
            <button
              style={{ margin: '1rem auto', display: 'block' }}
              onClick={() => {
                router.replace('/')
                setError(false)
              }}
            >
              Back to Homepage
            </button>
          </>
        )}
      </Form>
    </MainLayout>
  )
}

export default Checkout
