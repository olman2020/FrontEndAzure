import React from "react";
import '../styleCss/Button_bar.css'
function Buttonbar(props) {
    return (
      <div>
        <div onClick={props.handlerClick} class={` icon nav-icon-5 ${props.clicked?'open':''}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    )
}

export default Buttonbar