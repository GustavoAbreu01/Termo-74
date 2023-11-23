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
    const [labelsStats, setLabelsStats] = useState([]);
    const [colorsStats, setColorsStats] = useState([]);

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
            setLabelsStats(['1 Chance', '2 Chance', '3 Chance', '4 Chance', '5 Chance', '6 Chance']);
            setColorsStats(['#6F3DC2', '#7E4FC9', '#8C62D0', '#9A76D6', '#A989DC', "#B79CE2"]);
        } else if (window.location.pathname === '/') {
            setGamesStatus(JSON.parse(localStorage.getItem('termo')).status);
            setGameMode('Termo');
            setLabelsStats(['1 Chance', '2 Chance', '3 Chance', '4 Chance', '5 Chance']);
            setColorsStats(['#6F3DC2', '#7E4FC9', '#8C62D0', '#9A76D6', '#A989DC']);
        } else if (window.location.pathname === '/quarteto') {
            setGamesStatus(JSON.parse(localStorage.getItem('quarteto')).status);
            setGameMode('Quarteto');
            setLabelsStats(['1 Chance', '2 Chance', '3 Chance', '4 Chance', '5 Chance', '6 Chance', '7 Chance', '8 Chance']);
            setColorsStats(['#6F3DC2', '#7E4FC9', '#8C62D0', '#9A76D6', '#A989DC', '#B79CE2', '#C5B0E8', '#D4C3EE']);
        } else if (window.location.pathname === '/infinito') {
            setGamesStatus(JSON.parse(localStorage.getItem('infinito')).status);
            setGameMode('Infinito');
            setLabelsStats(['1 Chance', '2 Chance', '3 Chance', '4 Chance', '5 Chance']);
            setColorsStats(['#6F3DC2', '#7E4FC9', '#8C62D0', '#9A76D6', '#A989DC', '#B79CE2']);
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
                        <div className='menu_item'>
                            <a className='text_item_menu' href='/infinito'>Infinito</a>
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
            <ChartModal visibility={chartVisibility} gamesStatus={gamesStatus} gameMode={gameMode}
                colorsStats={colorsStats} labelsStats={labelsStats} />
        </>
    )
}

export default Menu