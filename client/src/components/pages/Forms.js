import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import callAPI from '../../utils/fetchData';
import { GetFormsAPI, deleteFormAPI } from '../../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Forms() {
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 3000,
        pauseOnHover: true,
        theme: 'colored',
        draggable: true,
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        }
        const fetchForms = async () => {
            const forms = await callAPI(GetFormsAPI, 'GET', user.token);
            if (forms.status === true) {
                setForms(forms.forms);
            } else if (forms.statusCode == 404) {
                setForms([{ msg: 'No Forms Found, Please create one' }]);
            } else {
                localStorage.removeItem('user');
                navigate('/login');
            }
        };
        fetchForms();
    }, []);

    const deleteForm = async (formId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const result = await callAPI(
            `${deleteFormAPI}/${formId}`,
            'DELETE',
            user.token
        );
        if (result.status === true) {
            toast.success(result.message, toastOptions);
            setForms(forms.filter((form) => form._id !== formId));
        } else {
            toast.error(result.message, toastOptions);
        }
    };
    return (
        <>
            <Navbar />

            {forms[0]?.msg !== undefined ? (
                <div>
                    <h1 className="flex items-center justify-center h-screen font-bold text-xl">
                        {forms[0].msg}
                    </h1>
                </div>
            ) : (
                <div>
                    <div className="md:container md:mx-auto mt-4 flex flex-col justify-center items-center">
                        {forms.map((form) => {
                            return (
                                <div
                                    key={form._id}
                                    className="shadow-md  sm:w-2/3 px-4 py-3 mb-8 rounded-sm space-y-4"
                                >
                                    <h2 className="font-bold text-xl">
                                        {form.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm pl-2">
                                        {form.description}
                                    </p>
                                    <div className="flex justify-end gap-4 text-white flex-wrap">
                                        <button
                                            className="outline-0 bg-red-400 hover:bg-red-600 px-4 py-1 rounded-sm"
                                            onClick={() => deleteForm(form._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-violet-500 hover:bg-violet-600 px-3 py-1 rounded-sm"
                                            onClick={() =>
                                                navigate(
                                                    `/forms/edit/${form._id}`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-violet-500 hover:bg-violet-600 px-3 py-1 rounded-sm"
                                            onClick={() =>
                                                navigate(`/forms/${form._id}`)
                                            }
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <ToastContainer />
                </div>
            )}
        </>
    );
}
