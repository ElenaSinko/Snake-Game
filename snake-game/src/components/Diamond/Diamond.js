import React from "react";
import "./Diamond.css";
import diamondImg from "../../img/diamond.svg";

export default (props) => {

    const style = {
        left: `${props.diamond[0]}px`,
        top: `${props.diamond[1]}px`
    }

    return (
        <div className='diamond' style={style}><img src={diamondImg} alt='diamond' /></div>
    )
}
