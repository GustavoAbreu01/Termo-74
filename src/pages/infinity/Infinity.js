import React from 'react'
import './Infinity.css'

function Infinity() {

    const date = new Date()

  return (
    <div className='container_infinity'>
        <p className='text_infinity'>Date: {date.getHours()} : {date.getMinutes()}</p>
    </div>
  )
}

export default Infinity