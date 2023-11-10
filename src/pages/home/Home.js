import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className='container_home'>
      <div className='container_instructions'>
        <div className='box_instructions'>
          <div className='title_instructions'>
            <h1 className='title_instructions'>Como jogar</h1>
          </div>
          <p className='text_instructions'>Para jogar, basta clicar em uma das opções de jogo no menu acima.</p>
          <p className='text_instructions'>Em seguida, você será redirecionado para uma página onde você poderá escolher o nível de dificuldade do jogo.</p>
          <p className='text_instructions'>Após escolher o nível de dificuldade, você será redirecionado para a página do jogo.</p>
          <p className='text_instructions'>Para jogar, basta clicar em uma das cartas e tentar encontrar o par correspondente.</p>
          <p className='text_instructions'>Quando você encontrar o par de uma carta, as duas cartas ficarão viradas para cima.</p>
          <p className='text_instructions'>Quando você encontrar todos os pares, você vence o jogo.</p>
          <div className='color_instructions'>
            <div className='box_colors' >
              <div>
                <p className='text_color_letter' >Quando a letra estiver na posição correta: </p>
                <div className='box_color'>
                  <div className='box_letter color_correct'>T</div>
                </div>
              </div>
              <div>
                <p className='text_color_letter'>Quando a letra não está na palavra: </p>
                <div className='box_color'>
                  <div className='box_letter color_present'>N</div>
                </div>
              </div>
              <div>
                <p className='text_color_letter' >Quando a letra estiver no local errado, mas está presente na palavra:</p>
                <div className='box_color'>
                  <div className='box_letter color_incorrect'>T</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home