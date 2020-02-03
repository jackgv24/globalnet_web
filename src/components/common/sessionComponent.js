import { default as React, useEffect, useState } from 'react';
import { Local as storage } from '../../helpers/expirate-storage';
import { ConfigDB as config } from '../../data/customizer/config';
import { logOut } from '../../auth/signin';
import { SESSION } from '../../constant/storeKeys';

const Session = ({ children, ...props }) => {
    const [pid, setPid] = useState(null);
    const [isInit, setIsInit] = useState(false);
    const [active, setActive] = useState(true);
    const [session, setSession] = useState(true);

    const checkSession = () => {
        const _pid = setInterval(() => {
            const _session = storage.get(SESSION);
            setSession(_session);
            console.log(_session);
            if (_session) {
                console.log('existe la sesion');
                storage.refresh(SESSION, { minute: config.data.session.expiration.minute });
            } else if (_pid) {
                // esto es para que el intervalo no se siga ejecutando
                console.error('no se va a seguir ejecutando el intervalo');
                clearInterval(_pid);
                setPid(null);
                logOut();
            }
        }, config.data.session.setTimeout || 30000); //por default son 30 segundos
        return _pid;
    };
    const visibilityChange = () => {
        setActive(!document.hidden);
    };

    useEffect(() => {
        /* Se agrega el evento para que cuando la persona se cruce de tab entonces se detenga el hilo de refrescar la session */
        document.addEventListener('visibilitychange', visibilityChange);
        setIsInit(true);
        return () => {
            document.removeEventListener('visibilitychange', () => null);
        };
    }, []);

    useEffect(() => {
        if (isInit) {
            if (!session) {
                clearInterval(pid);
                setPid(null);
                logOut();
            } else if (!active) {
                clearInterval(pid);
                setPid(null);
            } else if (!pid) {
                //refrescamiento de pid
                const _pid = checkSession();
                clearInterval(pid);
                setPid(_pid);
            }
        }
        return () => {
            if (pid) clearInterval(pid);
        };
    }, [active]);

    return <>{children}</>;
};

export default Session;
