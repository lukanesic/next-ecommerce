import React from 'react'

const Delivery = ({ cls, heading, description }) => {
  return (
    <div className={`delivery ${cls}`}>
      <h5>{heading}</h5>
      <p>{description}</p>
    </div>
  )
}

export default Delivery
