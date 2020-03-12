import { default as React, useState, useEffect } from 'react';
import user from '../../assets/images/user/user.png';
import '../../assets/scss/components/avatar.scss';

const Avatar = ({onChange=null,height=null,width=null}) => {
    const [url,setUrl] = useState(null);
    const [css,setCss] = useState({})

    useEffect(()=>{
        if(height && width) {
            setCss({height,width});
        } else if(height) {
            setCss({height});
        } else if(width) {
            setCss({width});
        }
    },[height,width]);

    const readUrl = event => {
        if (event.target.files.length === 0) {
            return;
        }
        //Image upload validation
        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        // Image upload
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        const img = event.target.files[0];
        reader.onload = _event => {
            console.log(img);
            setUrl(reader.result);
            if(typeof onChange === "function") {
                onChange(img);
            }
        };
    };

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="avatar rounded-circle" style={css}>
                    <img className="shadow-sm bg-ligth w-100 h-100 " src={url ? url : user} />
                    <div className="option">
                        <input className="upload w-100 h-100" type="file" accept="image/*" onChange={readUrl}/>
                        <i className="fa fa-camera"></i>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Avatar;
