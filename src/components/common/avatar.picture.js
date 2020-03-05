import { default as React,useState } from 'react';
import user from '../../assets/images/user/user.png';


const Avatar = props => {
    const [config] = useState({
        width:'10em',
        height:'auto',
        overflow:'hidden'
    });
    return (
        <>
            <div className="d-flex justify-content-center">
                    <div className=" rounded-circle" style={config}>
                        <img className="shadow-sm bg-ligth w-100" src={user}/>
                        <div></div>
                    </div>
            </div>
        </>
    );
};

export default Avatar;
