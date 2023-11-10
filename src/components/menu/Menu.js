import React from 'react'
import './Menu.css'

import { RiHome6Fill } from 'react-icons/ri'

function Menu() {
    return (
        <div className='container_menu'>
            <div className='box_menu'>
                <div className='menu_item'>
                    <a className='text_item_menu' href='/dueto'>Dueto</a>
                </div>
                <div className='menu_item'>
                    <a className='text_item_menu' href='/termo'>Termo</a>
                </div>
                <div className='menu_item'>
                    <a className='text_item_menu' href='/quarteto'>Quarteto</a>
                </div>
            </div>
            <a href='/'>
                <RiHome6Fill className='home_icon' />
            </a>
        </div>
    )
}

export default Menu