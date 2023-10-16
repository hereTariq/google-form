import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
// import ForgetPasswordPage from './components/pages/ForgetPasswordPage';
import CreateForm from './components/pages/CreateForm';
import ResponseForm from './components/pages/ResponseForm';
import Forms from './components/pages/Forms';
import EditForm from './components/pages/EditForm';
import ViewForm from './components/pages/ViewForm';

import './App.css';

export default function App() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState(null);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage setUser={setUser} />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" exact element={<LandingPage />} />

                <Route
                    path="/create-form"
                    element={<CreateForm setFormData={setFormData} />}
                />
                <Route path="/forms/:id" element={<ViewForm />} />
                <Route path="/forms/edit/:id" element={<EditForm />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/response-form/:id" element={<ResponseForm />} />
            </Routes>
        </BrowserRouter>
    );
}
