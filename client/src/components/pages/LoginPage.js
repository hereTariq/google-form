import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { LoginAPI } from '../../utils/APIRoutes';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';

export default function LoginPage({ setUser }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        theme: 'colored',
        draggable: true,
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/forms');
        }
    });
    const submitForm = async (e) => {
        e.preventDefault();
        if (validate()) {
            const response = await fetch(LoginAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.status === true) {
                setUser(data);
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        token: data.access_token,
                        userId: data.user._id,
                    })
                );

                navigate('/forms');
            } else {
                toast.error(data.message, toastOptions);
            }
        }
    };
    const validate = () => {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!email || !password) {
            toast.error('Email and Password are required.', toastOptions);
            return false;
        } else if (regex.test(email) === false) {
            toast.error('Email is not Valid.', toastOptions);
            return false;
        }

        return true;
    };
    return (
        <>
            <div className="text-center m-5-auto">
                <h2 className="text-3xl font-bold">LOGIN</h2>
                <form className="space-y-4" onSubmit={(e) => submitForm(e)}>
                    <p>
                        <label>Email address</label>
                        <br />
                        <input
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </p>
                    <p>
                        <label>Password</label>
                        {/* <Link to="/forget-password"><label className="right-label">Forget password?</label></Link> */}
                        <br />
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </p>
                    <p>
                        <button id="sub_btn" type="submit">
                            Login
                        </button>
                    </p>
                </form>

                <footer>
                    <p>
                        First time?{' '}
                        <Link to="/register">Create an account</Link>.
                    </p>
                    <p>
                        <Link to="/">Back to Homepage</Link>.
                    </p>
                </footer>
            </div>
            <ToastContainer />
        </>
    );
}
