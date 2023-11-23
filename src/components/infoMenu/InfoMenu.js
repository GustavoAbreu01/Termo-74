import React from 'react'
import './InfoMenu.css'

function InfoMenu({ visibility }) {

    const handleClose = () => {
        document.querySelector('.container_info').classList.remove('active');
    }

    return (
        <div className={`container_info ${visibility ? 'active' : ''}`}>
            <div className='box_info'>
                <div className='info_header'>
                    <p className='title_info'>Regras de Jogo</p>
                </div>
                <p className='text_info'>
                    Adivinhe a palavra secreta em até 5 tentativas.
                    Após cada palpite, a cor dos quadrados mudará para
                    mostrar o quão perto o seu palpite estava da palavra.
                </p>
                <div className='container_row'>
                    <div className='letter_box'>A</div>
                    <div className='letter_box'>R</div>
                    <div className='letter_box'>E</div>
                    <div className='letter_box'>I</div>
                    <div className='letter_box_correct'>O</div>
                </div>
                <p className='text_info'>A letra <span className='text_correct'>O</span> está na palavra e no local correto.</p>
                <div className='container_row'>
                    <div className='letter_box'>F</div>
                    <div className='letter_box'>U</div>
                    <div className='letter_box'>N</div>
                    <div className='letter_box_present'>D</div>
                    <div className='letter_box'>E</div>
                </div>
                <p className='text_info'>A letra <span className='text_present'>D</span> está na palavra, mas no local errado.</p>
                <div className='container_row'>
                    <div className='letter_box'>R</div>
                    <div className='letter_box'>A</div>
                    <div className='letter_box_incorrect'>I</div>
                    <div className='letter_box'>O</div>
                    <div className='letter_box'>S</div>
                </div>
                <p className='text_info'>A letra <span className='text_incorrect'>I</span> não está na palavra em nenhum local.</p>
            </div>
        </div>
    )
}

export default InfoMenu