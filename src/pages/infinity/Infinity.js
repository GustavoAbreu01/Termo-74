import React from 'react'
import { IoConstruct } from "react-icons/io5";
import './Infinity.css'

function Infinity() {
  return (
    <div className='container_maintence'>
      <IoConstruct className='icon_maintence' color='white' />
      <p className='text_maintence'>Em Manutenção...</p>
    </div>
  )
}

export default Infinity