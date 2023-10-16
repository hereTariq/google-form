import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateFormAPI } from '../../utils/APIRoutes';
import Navbar from './Navbar';

export default function CreateForm() {
    const navigate = useNavigate();
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        theme: 'colored',
        draggable: true,
    };
    const [title, setTitle] = useState('Untitled Form');
    const [description, setDescription] = useState('Form Description');
    const [formContent, setFormContent] = useState([
        {
            id: 0,
            name: '0',
            label: 'Untitled Question',
            required: false,
            question_type: 'short_answer',
            list: [],
        },
    ]);
    const [onEdit, setOnEdit] = useState(false);
    const [textField, setTextField] = useState('');
    const [editedField, setEditedField] = useState('');

    // let user;
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        }
    });

    const addQuestion = () => {
        const field = {
            name: `question_${formContent.length}_${Math.floor(
                Math.random() * 9999
            )}`,
            label: 'Untitled question',
            required: false,
            question_type: 'short_answer', // "paragraph", "multichoice",
            list: [],
            value: '',
        };
        setFormContent([...formContent, field]);
    };

    const editField = (fieldName, fieldLabel) => {
        const formFields = [...formContent];
        const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
        if (fieldIndex > -1) {
            formFields[fieldIndex].label = fieldLabel;
            setFormContent(formFields);
        }
    };

    const editFieldType = (fieldName, fieldLabel) => {
        const formFields = [...formContent];
        const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
        if (fieldIndex > -1) {
            formFields[fieldIndex].question_type = fieldLabel;
            setFormContent(formFields);
        }
    };

    const addFieldOption = (fieldName, option) => {
        const formFields = [...formContent];
        const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
        if (fieldIndex > -1) {
            if (option && option != '') {
                formFields[fieldIndex].list.push(option);
                setFormContent(formFields);
                setTextField('');
            }
        }
    };

    const removeField = (fieldName) => {
        const formFields = [...formContent];
        const fields = formFields.filter(
            (formField) => formField.name !== fieldName
        );
        if (fields.length > 0) {
            setFormContent(fields);
        } else {
            alert('There must be at least one question');
        }
        // console.log(fields.length);
    };
    const submitForm = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        }

        const response = await fetch(CreateFormAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                title,
                description,
                formFields: formContent,
                userId: user.userId,
            }),
        });
        const data = await response.json();
        if (data.status === true) {
            navigate(`/response-form/${data.form._id}`);
            console.log(data);
        } else {
            toast.error(data.message, toastOptions);
        }
    };
    return (
        <>
            {' '}
            <Navbar />
            <div className="container mx-auto flex flex-col justify-start items-center px-4 h-screen sm:w-4/5 space-y-4">
                <div className="flex flex-col px-4 bg-white rounded-md justify-center item-start w-full shadow-sm border-indigo-800 border-t-8 space-y-2 h-24">
                    <input
                        type="text"
                        className="text-3xl font-semibold w-full"
                        placeholder=""
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        className="text-gray-500/80"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                                                    onChange={(e) =>
                                                        editField(
                                                            field.name,
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={() => {
                                                        setOnEdit(false);
                                                        setEditedField('');
                                                    }}
                                                />
                                            ) : (
                                                <label
                                                    onClick={() => {
                                                        setOnEdit(true);
                                                        setEditedField(
                                                            field.name
                                                        );
                                                    }}
                                                >
                                                    {field.label}
                                                </label>
                                            )}
                                        </div>
                                        <div>
                                            <select
                                                onChange={(e) =>
                                                    editFieldType(
                                                        field.name,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="short_answer">
                                                    Short Answer
                                                </option>
                                                <option value="paragraph">
                                                    Paragraph
                                                </option>
                                                <option value="multichoice">
                                                    Multichoice
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="my-4 w-full">
                                        {field.question_type ==
                                            'short_answer' && (
                                            <input
                                                type="text"
                                                className="px-5 shadow-sm h-10 rounded-md block w-full"
                                                placeholder={field.label}
                                            />
                                        )}
                                        {field.question_type == 'paragraph' && (
                                            <textarea
                                                rows={4}
                                                className="px-5 shadow-sm h-10 rounded-md block w-full"
                                                placeholder={field.label}
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
                                                <div className="flex space-between">
                                                    <input
                                                        type="text"
                                                        onChange={(e) =>
                                                            setTextField(
                                                                e.target.value
                                                            )
                                                        }
                                                        value={textField}
                                                        placeholder="Add an option"
                                                        className="flex-1"
                                                    />
                                                    <button
                                                        className="bg-indigo-700 block hover:bg-indigo-900 text-white px-4"
                                                        onClick={() =>
                                                            addFieldOption(
                                                                field.name,
                                                                textField
                                                            )
                                                        }
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <button
                                            onClick={() =>
                                                removeField(field.name)
                                            }
                                        >
                                            <TrashIcon className=" w-6 h-8 text-gray-400 hover:text-indigo-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className=" absolute space-y-1 top-0 -right-6 sm:-right-14 flex flex-col justify-between items-center bg-white p-2 rounded-md shadow-md">
                        <button onClick={() => addQuestion()}>
                            <PlusCircleIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 hover:text-indigo-500" />
                        </button>
                    </div>
                    <button
                        className="mb-4 bg-indigo-600 px-4 py-2 hover:bg-indigo-700 rounded-md text-white"
                        type="submit"
                        onClick={(e) => submitForm(e)}
                    >
                        Submit
                    </button>
                </div>

                <ToastContainer />
            </div>
        </>
    );
}
