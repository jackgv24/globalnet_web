import { default as React, useEffect } from 'react';
import { localStorage as storage } from '../../helpers/expirate-storage';
import {SESSION} from '../../constant/storeKeys';

const Session = ({ children, ...props }) => {
    useEffect(()=>{
        return () => {
            storage.remove(SESSION);
        }
    },[]);
    return <>{children}</>;
};
