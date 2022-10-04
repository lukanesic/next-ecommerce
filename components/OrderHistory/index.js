import Image from 'next/image'
import React from 'react'

const OrderHistory = ({ order, account, admin }) => {
  return (
    <div className='order'>
      {admin && <h2>Customer ID: {order.customer}</h2>}
      {account && <h2>Order ID: {order._id}</h2>}
      {order.orderItems.map((item) => (
        <div className='order-items' key={item._id}>
          <div className='order-description'>
            <h5>{item.name}</h5>
            <h5>Price: ${item.price}</h5>
            <h5>Quantity: {item.qty}</h5>
            <h5>Total to pay: ${item.price * item.qty}</h5>
          </div>
          <div className='order-img'>
            <Image src={item.image} alt={item.name} width={150} height={150} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderHistory
