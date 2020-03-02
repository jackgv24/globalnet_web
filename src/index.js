import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux**
import { Provider } from 'react-redux';
import store from './store/index';
import App from './components/app';
import Session from './components/common/sessionComponent';
import { session } from './data/base';
import { 
    COLABORADOR_ADD,
    CARGOS_ADD,
    CARGOS_SHOW_ALL,
    CARGOS_SHOW_BY_ID 
} from "./constant/url";

// Import custom Components

import Default from './components/dashboard/defaultCompo/default';
import SignIn from './auth/signin';

// sample page
import Samplepage from './components/sample/samplepage';
import {default as Lab} from './components/dashboard/componentLab';
import { default as ColaboradorView } from './components/dashboard/colaborador/colaborador.view';
import { default as ColaboradorAdd } from './components/dashboard/colaborador/colaborador.add.rebuild';
import { default as CargosAdd } from './components/dashboard/cargos/cargos.add';
import { default as CargosHandle } from './components/dashboard/cargos/cargos.handler';
import { default as CargosView } from './components/dashboard/cargos/cargos.view';

//firebase Auth
function Root() {
    const [currentUser, setCurrentUser] = useState(true);

    useEffect(() => {
        const themeColor = 'style';
        const layout = 'light';

        session.onAuthStateChanged(data => {
            setCurrentUser(!!data);
        });

        document
            .getElementById('color')
            .setAttribute('href', `${process.env.PUBLIC_URL}/assets/css/${themeColor}.css`);
        document.body.classList.add(layout);
    }, []);

    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter basename={'/'}>
                    <ScrollContext>
                        <Switch>
                            <Route path={`${process.env.PUBLIC_URL}/login`} component={SignIn} />
                            {currentUser ? (
                                <Session>
                                    <App>
                                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Default}/>
                                        <Route exact path={`${process.env.PUBLIC_URL}/dashboard/default`} component={Default}/>
                                        <Route path={`${process.env.PUBLIC_URL}/sample/samplepage`} component={Samplepage}/>
                                        <Route exact path={`${process.env.PUBLIC_URL}/colaborador`} component={ColaboradorView}/>
                                        <Route exact path={`${process.env.PUBLIC_URL}${CARGOS_SHOW_ALL}`} component={CargosView}/>
                                        <Route path={`${process.env.PUBLIC_URL}${COLABORADOR_ADD}`} component={ColaboradorAdd}/>
                                        <Route exact path={`${process.env.PUBLIC_URL}${CARGOS_SHOW_BY_ID}`} component={CargosHandle}/>
                                        <Route exact path={`${process.env.PUBLIC_URL}${CARGOS_ADD}`} component={CargosAdd}/>
                                        <Route exact path={`${process.env.PUBLIC_URL}/labs`} component={Lab} />
                                    </App>
                                </Session>
                            ) : (
                                <Redirect to={`${process.env.PUBLIC_URL}/login`} />
                            )}
                        </Switch>
                    </ScrollContext>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
