import React from 'react';
import BarraNav from './Barra';
import '../styleCss/MainScreen.css'
import imagenI from './assets/imageninfo.jpg'

import imagenI2 from './assets/imageninfo2.jpg'

function MainScreen(){
    return(
        <div className='div-MainScreen'>
            <header>
            <BarraNav/>
            </header>
            
            <div className='div-img'>
                <div>
                  <h2 className='titulo'>Construye tu cuerpo con una sana dieta, alimentacion y trabajo</h2>
                </div>
            </div>
           <section className='info'>

            <div>
                <div class="titulo-central">
                    BETTER RESULTS IN LESS TIME
                </div>
        
            </div>
             
           </section>
          <footer className='footer-icon'>
                   <i class="fa-brands fa-instagram"></i>
                   <i class="fa-brands fa-facebook facebook"></i>
                   <i class="fa-brands fa-twitter"></i>

          </footer>
       
        </div>
    )
}

export default MainScreen