import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="flex list-none justify-around items-center pr-2 md:text-xl text-base py-8 shadow-md bg-gray-100">
            <ul className=" flex justify-center items-center gap-4 text-indigo-700 hover:text-indigo-900">
                <li>
                    <Link style={{ textDecoration: 'none' }} to="/forms">
                        Forms
                    </Link>
                </li>

                <li>
                    <Link style={{ textDecoration: 'none' }} to="/create-form">
                        Create Form
                    </Link>
                </li>
            </ul>

            <button
                className="px-3 py-2 font-normal bg-red-700 hover:bg-red-800 rounded-md text-white"
                onClick={() => {
                    localStorage.removeItem('user');
                    navigate('/login');
                }}
            >
                LOGOUT
            </button>
        </div>
    );
}
