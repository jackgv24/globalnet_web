import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux**
import { Provider } from 'react-redux';
import store from './store/index';
import App from './components/app';
import { session } from './data/base';

// Import custom Components

import Default from './components/dashboard/defaultCompo/default';
import SignIn from './auth/signin';

// sample page
import Samplepage from './components/sample/samplepage';

//firebase Auth
function Root() {
    const [currentUser, setCurrentUser] = useState(true);

    useEffect(() => {
        const themeColor = localStorage.getItem('theme-color');
        const layout = localStorage.getItem('layout_version');
        session.onAuthStateChanged(data => {
            if (!data) {
                setCurrentUser(false);
            }
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
                                <Fragment>
                                    <App>
                                        {/* dashboard menu */}
                                        <Route
                                            exact
                                            path={`${process.env.PUBLIC_URL}/`}
                                            component={Default}
                                        />
                                        <Route
                                            exact
                                            path={`${process.env.PUBLIC_URL}/dashboard/default`}
                                            component={Default}
                                        />

                                        {/* Sample page */}
                                        <Route
                                            path={`${process.env.PUBLIC_URL}/sample/samplepage`}
                                            component={Samplepage}
                                        />
                                    </App>
                                </Fragment>
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
