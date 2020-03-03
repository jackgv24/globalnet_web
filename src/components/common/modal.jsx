import { default as React, useState,useLayoutEffect } from 'react';

const Modal = ({ active = false,background=null }) => {
    const [style, setStyle] = useState({
        top: 0,
        left: 0,
        background: 'rgba(255,255,255,0.5)',
        zIndex: 10,
    });

    useLayoutEffect(()=>{
        if(background !== null) setStyle({...style,background})
    },[])

    return (
        <div
            id="modal"
            className={`position-absolute w-100 h-100 ${
                active ? 'd-flex' : 'd-none'
            } justify-content-center align-items-center`}
            style={style}
        >
            <div className="loader-box">
                <div className="loader">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
