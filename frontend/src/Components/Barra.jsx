import React, {useState} from 'react'
import '../styleCss/Barra_nav.css'
import Buttonbar from './Button'

function BarraNav(){

    const [click,setclick]=useState(false)
    const handlerClick=()=>{
        setclick(!click)
    }
    return (

        <div>
            <nav className='nav-div'>
                <h2><a href='/'>Menu</a><span>NutriTEc</span> </h2>
                <ul className={`ul-nav-div ${click? 'active': ""}`}>
                    <li> <a href="/administrador"> Administrador</a></li>
                    <li><a href="/nutricionista">Nutricionista</a></li>
                    <li><a href="/cliente">Usuario</a></li>
                </ul>
                <div className='button-bar'>
|                    <Buttonbar clicked={click} handlerClick={handlerClick} />
                </div>
                <div className={`inicio ${click? 'inicio_active ':''}` }>
                </div>
                

            </nav>
        </div>
    )
}

export default BarraNav