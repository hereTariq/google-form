import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetFormAPI } from '../../utils/APIRoutes';
import callAPI from '../../utils/fetchData';
import Navbar from './Navbar';

export default function EditForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('Untitled Form');
    const [description, setDescription] = useState('Form Description');
    const [formContent, setFormContent] = useState([]);
    const [onEdit, setOnEdit] = useState(false);
    // const [textField, setTextField] = useState('');
    const [editedField, setEditedField] = useState('');

    // let user;
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        }

        const fetchForm = async () => {
            const form = await callAPI(
                `${GetFormAPI}/${id}`,
                'GET',
                user.token
            );
            if (form.status == true) {
                setTitle(form.form.title);
                setDescription(form.form.description);
                setFormContent(form.form.formFields);
            }
        };
        fetchForm();
    }, []);

    return (
        <>
            {' '}
            <Navbar />
            <div className="container mx-auto  flex flex-col justify-start items-center px-4 h-screen sm:w-4/5 space-y-4">
                <div className="flex flex-col px-4 bg-white rounded-md justify-center item-start w-full shadow-sm border-indigo-800 border-t-8 space-y-2 h-24">
                    <input
                        type="text"
                        className="text-3xl font-semibold"
                        placeholder=""
                        value={title}
                        readOnly
                    />
                    <input
                        type="text"
                        className="text-gray-500/80 w-full"
                        value={description}
                        readOnly
                    />
                </div>

                <div className=" relative flex flex-col w-full space-y-4">
                    {formContent.map((field) => {
                        return (
                            <div
                                key={field.name}
                                className="rounded-md bg-white flex w-full shadow-md px-4"
                            >
                                <div className="flex flex-col w-full">
                                    <div className="flex justify-between items-center space-y-2">
                                        <div
                                            key={field.name}
                                            className="block text-sm font-medium text-gray-700 capitalize"
                                        >
                                            {onEdit &&
                                            editedField === field.name ? (
                                                <input
                                                    type="text"
                                                    className="border border-black"
                                                    value={field.label}
                                                    readOnly
                                                />
                                            ) : (
                                                <label>{field.label}</label>
                                            )}
                                        </div>
                                        <div>
                                            <p>{field.question_type}</p>
                                        </div>
                                    </div>

                                    <div className="my-4 w-full">
                                        {field.question_type ==
                                            'short_answer' && (
                                            <input
                                                type="text"
                                                className="px-5 shadow-sm h-10 rounded-md block w-full"
                                                placeholder={field.label}
                                                readOnly
                                            />
                                        )}
                                        {field.question_type == 'paragraph' && (
                                            <textarea
                                                rows={4}
                                                className="px-5 shadow-sm h-10 rounded-md block w-full"
                                                placeholder={field.label}
                                                readOnly
                                            />
                                        )}
                                        {field.question_type ==
                                            'multichoice' && (
                                            <div className="my-4 flex flex-col space-y-2">
                                                <select className="px-5 shadow-sm h-10 rounded-md block w-full">
                                                    {field.list.map((item) => (
                                                        <option
                                                            key={item}
                                                            value={item}
                                                        >
                                                            {item}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {/* <div className=" absolute space-y-1 top-0 -right-16 flex flex-col justify-between items-center bg-white p-2 rounded-md shadow-md">
                        <button onClick={() => addQuestion()}>
                            <PlusCircleIcon className="w-8 h-8 text-gray-400 hover:text-indigo-500" />
                        </button> */}
                    {/* <button onClick={() => addQuestion()}>
                        <PlusCircleIcon className="w-8 h-8 text-gray-400 hover:text-indigo-500" />
                    </button>
                    <button onClick={() => addQuestion()}>
                        <PlusCircleIcon className="w-8 h-8 text-gray-400 hover:text-indigo-500" />
                    </button> */}
                    {/* </div> */}
                    <button
                        className="bg-indigo-600 px-4 py-2 hover:bg-indigo-700 rounded-md text-white"
                        type="submit"
                        onClick={(e) => navigate(`/forms/edit/${id}`)}
                    >
                        Edit
                    </button>
                </div>

                <ToastContainer />
            </div>
        </>
    );
}
