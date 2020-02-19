import { default as React } from 'react';

const Modal = ({ active = false }) => {
    const modalStyle = {
        top: 0,
        left: 0,
        background: 'rgba(0,0,0,0.05)',
        zIndex: 10,
    };

    return (
        <div id="modal" className={`position-absolute w-100 h-100 ${active?'d-flex':'d-none'} justify-content-center align-items-center`} style={modalStyle}>
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
