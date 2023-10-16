import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { RegisterAPI } from '../../utils/APIRoutes';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';

export default function SignUpPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
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
            navigate('/form');
        }
    });
    const submitForm = async (e) => {
        e.preventDefault();
        if (validate()) {
            const response = await fetch(RegisterAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (data.status === true) {
                navigate('/login');
            } else {
                toast.error(data.message, toastOptions);
            }
        }
    };
    const validate = () => {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (username.length === 0) {
            toast.error('Username is required.', toastOptions);
            return false;
        } else if (!email || regex.test(email) === false) {
            toast.error('Email is not Valid.', toastOptions);
            return false;
        } else if (!password) {
            toast.error('Password is required.', toastOptions);
            return false;
        } else if (password.length < 6) {
            toast.error(
                'Password must be equal or greater than 6 characters.',
                toastOptions
            );
            return false;
        }

        return true;
    };
    return (
        <>
            <div className="text-center m-5-auto">
                <h5>Create your personal account</h5>
                <form className="space-y-4" onSubmit={(e) => submitForm(e)}>
                    <p>
                        <label>Username</label>
                        <br />
                        <input
                            type="text"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </p>
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
                        <br />
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </p>

                    <p>
                        <button id="sub_btn" type="submit">
                            Register
                        </button>
                    </p>
                    <p>
                        <Link to="/login">I am already a member</Link>.
                    </p>
                </form>
                <footer>
                    <p>
                        <Link to="/">Back to Homepage</Link>.
                    </p>
                </footer>
            </div>

            <ToastContainer />
        </>
    );
}
