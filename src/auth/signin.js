import React, { useState, useEffect } from 'react';
import { auth } from 'firebase';
import logo from '../assets/images/endless-logo.png';
import man from '../assets/images/dashboard/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { withRouter } from 'react-router';
import { session } from '../data/base';
import { ConfigDB as config } from "../data/customizer/config";
import { Local as storage } from '../helpers/expirate-storage';
import { SESSION } from '../constant/storeKeys';

const logOut = async () => {
    try {
        await session.signOut();
    } catch (error) {
        console.error(error);
    }
};

const SignIn = ({ history }) => {
    const [email, setEmail] = useState('zadirg95@gmail.com');
    const [password, setPassword] = useState('Admin@123');
    const [value, setValue] = useState(localStorage.getItem('profileURL' || man));

    useEffect(() => {
        localStorage.setItem('profileURL', value);
    }, [value]);

    const loginAuth = async (event) => {
        try {
            event.preventDefault();
            await session.setPersistence(auth.Auth.Persistence.LOCAL);
            await session.signInWithEmailAndPassword(email, password);
            storage.set(SESSION,JSON.stringify(session.currentUser),{minute:config.data.session.expiration.minute});
            setValue(man);
            history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
        } catch (error) {
            console.error(error);
            setTimeout(() => {
                toast.error(
                    'Oppss.. The password is invalid or the user does not have a password.',
                );
            }, 200);
        }
    };

    return (
        <div>
            <div className="page-wrapper">
                <div className="container-fluid p-0">
                    {/* <!-- login page start--> */}
                    <div className="authentication-main">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="auth-innerright">
                                    <div className="authentication-box">
                                        <div className="text-center">
                                            <img src={logo} alt="" />
                                        </div>
                                        <div className="card mt-4">
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <h4>LOGIN</h4>
                                                    <h6>Enter your Username and Password </h6>
                                                </div>
                                                <form className="theme-form">
                                                    <div className="form-group">
                                                        <label className="col-form-label pt-0">
                                                            Your Name
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="email"
                                                            name="email"
                                                            value={email}
                                                            onChange={e => setEmail(e.target.value)}
                                                            placeholder="Email address"
                                                        />
                                                        {/* {errors.email && 'Email is required'} */}
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">
                                                            Password
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="password"
                                                            name="password"
                                                            value={password}
                                                            onChange={e =>
                                                                setPassword(e.target.value)
                                                            }
                                                        />
                                                        {/* {errors.password && 'Email is required'} */}
                                                    </div>
                                                    <div className="checkbox p-0">
                                                        <input id="checkbox1" type="checkbox" />
                                                        <label htmlFor="checkbox1">
                                                            Remember me
                                                        </label>
                                                    </div>
                                                    <div className="form-group form-row mt-3 mb-0">
                                                        <button
                                                            className="btn btn-primary btn-block"
                                                            type="button"
                                                            onClick={loginAuth}
                                                        >
                                                            Login
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                    {/* <!-- login page end--> */}
                </div>
            </div>
        </div>
    );
};

export default withRouter(SignIn);
export {logOut};
