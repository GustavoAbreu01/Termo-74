import React, { useState } from 'react'
import './Menu.css'

import { RiHome6Fill } from 'react-icons/ri'
import { FaArrowUp, FaQuestion } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import InfoMenu from '../infoMenu/InfoMenu';
import ChartModal from '../chartModal/ChartModal';

function Menu() {

    const [visibility, setVisibility] = useState(true);
    const [infoVisibility, setInfoVisibility] = useState(false);
    const [chartVisibility, setChartVisibility] = useState(false);
    const [gameMode, setGameMode] = useState('');
    const [gamesStatus, setGamesStatus] = useState([]);

    const openQuestion = () => {
        if (chartVisibility) {
            setChartVisibility(!chartVisibility);
        }
        setInfoVisibility(!infoVisibility);
    }

    const openMenu = () => {
        setVisibility(!visibility);
    }

    const openCharts = () => {
        if (infoVisibility) {
            setInfoVisibility(!infoVisibility);
        }
        if (window.location.pathname === '/dueto') {
            setGamesStatus(JSON.parse(localStorage.getItem('dueto')).status);
            setGameMode('Dueto');
        } else if (window.location.pathname === '/') {
            setGamesStatus(JSON.parse(localStorage.getItem('termo')).status);
            setGameMode('Termo');
        } else if (window.location.pathname === '/quarteto') {
            setGamesStatus(JSON.parse(localStorage.getItem('quarteto')).status);
            setGameMode('Quarteto');
        }
        setChartVisibility(!chartVisibility);
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
                            <a className='text_item_menu' href='/'>Termo</a>
                        </div>
                        <div className='menu_item'>
                            <a className='text_item_menu' href='/quarteto'>Quarteto</a>
                        </div>
                    </div>
                    <a href='/'>
                        <RiHome6Fill className='home_icon' />
                    </a>
                    <div className='options_header'>
                        <div onClick={openMenu} className={`header_icons ${visibility ? 'active' : ''}`}>
                            <FaArrowUp className={`icon ${visibility ? 'active' : ''}`} />
                        </div>
                        <div onClick={openCharts} className={`header_icons ${chartVisibility ? 'active' : ''}`}>
                            <IoStatsChart className='icon' />
                        </div>
                        <div onClick={openQuestion} className={`header_icons ${infoVisibility ? 'active' : ''}`}>
                            <FaQuestion className='icon' />
                        </div>
                    </div>
                </div>
            </div>
            <InfoMenu visibility={infoVisibility} />
            <ChartModal visibility={chartVisibility} gamesStatus={gamesStatus} gameMode={gameMode} />
        </>
    )
}

export default Menu