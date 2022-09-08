import React from 'react'
import { GrClose } from 'react-icons/gr'
import Delivery from '../Delivery'

// { name, description1, description2, price, qty }

const Content = () => {
  return (
    <div className='cart-content'>
      <div className='cart-c-info'>
        {/* <h4>{item.name}</h4>
        <p>{item.description1}</p>
        <p>{item.description2}</p> */}
        <h4>Name</h4>
        <p>Desc 1</p>
        <p>Desc 2</p>
      </div>

      <div className='cart-price-qty'>
        <div className='c-cont price'>
          <h5>Price</h5>
          {/* <h5>${item.price}</h5> */}
          <h5>$Price</h5>
        </div>
        <div className='c-cont qty'>
          <h5>Quantity</h5>
          {/* <h5>{item.qty}</h5> */}
          <h5>Qty</h5>
        </div>
      </div>

      <div className='cart-c-delivery'>
        <Delivery
          heading={'Availability'}
          description={
            'This item is in stock and will be delivered on or before 04/22/22'
          }
          cls={''}
        />
        <Delivery
          heading={'Delivery'}
          description={'Ships Free via USPS Expedited Delivery '}
          cls={''}
        />
        <Delivery
          heading={'Returns'}
          description={'This item can be returned within 30 days of delivery.'}
          cls={'b-r-none'}
        />
      </div>

      <div
        className='cart-remove'
        onClick={() => dispatch(removeFromCart(item))}
      >
        <GrClose />
        <h5>Remove </h5>
      </div>
    </div>
  )
}

export default Content