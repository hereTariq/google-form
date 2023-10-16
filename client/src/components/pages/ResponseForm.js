import React, { useEffect, useState } from 'react';
import { GetFormAPI, CreateResponseFormAPI } from '../../utils/APIRoutes';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import callApi from '../../utils/fetchData';

import '../../App.css';
import Navbar from './Navbar';

export default function ResponseForm() {
    const [elements, setElements] = useState(null);

    const [values, setValues] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        theme: 'colored',
        draggable: true,
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        }

        async function fetchFormData() {
            const form = await callApi(
                `${GetFormAPI}/${id}`,
                'GET',
                user.token
            );
            if (form.status === true) {
                setElements(form.form);
            } else if (form.message === 'Unauthorized') {
                toast.error(form.message, toastOptions);
                navigate('/login');
            } else {
                toast.error(form.message, toastOptions);
            }
        }

        fetchFormData();
    }, []);

    const changeHandle = (e, label) => {
        const { value } = e.target;
        setValues({ ...values, [label]: value });
    };
    async function handleSubmit(event) {
        event.preventDefault();
        let data = [];
        data.push(values);

        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(CreateResponseFormAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                answers: data,
                userId: user.userId,
                formId: id,
            }),
        });
        const responseForm = await response.json();
        if (!responseForm.status) {
            toast.error(responseForm.message, toastOptions);
        } else {
            toast.success(responseForm.message, toastOptions);
            navigate('/forms');
        }
    }
    return (
        <>
            <Navbar />
            <div className="container mx-auto w-2/3">
                <div className="flex flex-col px-4 bg-white rounded-md justify-center item-start w-full shadow-sm border-indigo-800 border-t-8 space-y-2 h-24">
                    <h1 className="text-3xl font-semibold">
                        {elements?.title}
                    </h1>
                    <p className="text-gray-500/80">{elements?.description}</p>
                </div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className=" flex flex-col  space-y-4"
                >
                    {elements?.formFields?.map((field) => {
                        return (
                            <div
                                key={field.name}
                                className="flex justify-between items-center space-y-4"
                            >
                                {field.question_type === 'short_answer' ? (
                                    <div className="block space-y-2 flex flex-col text-sm font-medium text-gray-700 capitalize w-full">
                                        <label htmlFor="">{field.label}</label>
                                        <input
                                            className="pl-3 shadow-sm h-10 rounded-md block w-full text-xl"
                                            name={field.name}
                                            type="text"
                                            required
                                            onChange={(e) =>
                                                changeHandle(e, field.label)
                                            }
                                        />
                                    </div>
                                ) : field.question_type === 'paragraph' ? (
                                    <div
                                        key={field.name}
                                        className="block space-y-2 flex flex-col text-sm font-medium text-gray-700 capitalize"
                                    >
                                        <label htmlFor="">{field.label}</label>
                                        <textarea
                                            name={field.name}
                                            required
                                            className="p-1 shadow-sm h-10 rounded-md block w-full"
                                            id=""
                                            rows="10"
                                            cols="60"
                                            onChange={(e) =>
                                                changeHandle(e, field.label)
                                            }
                                        ></textarea>
                                    </div>
                                ) : (
                                    <div className="block space-y-2 flex flex-col text-sm font-medium text-gray-700 capitalize">
                                        <label htmlFor="">{field.label}</label>
                                        {field.list.map((item) => {
                                            return (
                                                <div
                                                    key={item}
                                                    className="flex items-center mb-4"
                                                >
                                                    <input
                                                        className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                                        type="radio"
                                                        id={item}
                                                        value={item}
                                                        name={field.name}
                                                        onChange={(e) =>
                                                            changeHandle(
                                                                e,
                                                                field.label
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={item}
                                                        className="text-sm font-medium text-gray-900 ml-2 block"
                                                    >
                                                        {item}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white"
                    >
                        Submit
                    </button>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}
