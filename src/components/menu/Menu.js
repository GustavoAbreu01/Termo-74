import React, { useState } from 'react'
import './Menu.css'

import { RiHome6Fill } from 'react-icons/ri'
import { FaArrowUp, FaQuestion } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import InfoMenu from '../infoMenu/InfoMenu';

function Menu() {

    const [visibility, setVisibility] = useState(true);
    const [infoVisibility, setInfoVisibility] = useState(false);

    const openQuestion = () => {
        setInfoVisibility(!infoVisibility);
    }

    const openMenu = () => {
        setVisibility(!visibility);
    }

    return (
        <>
            <div className={`container_header ${visibility ? 'active' : ''}`}>
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
                    <div className='options_header'>
                        <div onClick={openMenu} className='header_icons'>
                            <FaArrowUp className={`icon ${visibility ? 'active' : ''}`} />
                        </div>
                        <div className='header_icons'>
                            <IoStatsChart className='icon' />
                        </div>
                        <div onClick={openQuestion} className='header_icons'>
                            <FaQuestion className='icon' />
                        </div>
                    </div>
                </div>
            </div>
            <InfoMenu visibility={infoVisibility} />
        </>
    )
}

export default Menu