import React, { Fragment , useState , useEffect } from 'react';

const Loader = ({show=true,timeOut=null,...props}) => {
    const [canShow,setCanShow] = useState(show);
    useEffect(()=>{
        if(typeof timeOut === 'number'){
            setTimeout(() => {
                setCanShow(false);
            }, timeOut);
        }
    },[]);
    useEffect(()=>{
        setCanShow(show);
    },[show])
    return (
        <>
            <div className={`loader-wrapper ${canShow ? '' : 'loderhide'}`}  style={{position:'absolute'}}>
                <div className="loader bg-white">
                    <div className="whirly-loader"> </div>
                </div>
            </div>
        </>
    );
};

export default Loader;