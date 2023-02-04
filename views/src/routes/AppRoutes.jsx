import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../backend/pages/Dashboard';
import Error from '../frontend/pages/Error';
import Home from '../frontend/pages/Home';
import AppLayout from '../layout/AppLayout';

function AppRoutes() {
    return (
        <Routes>
            {/* =========================== 
                        Frontend Route
            =============================== */}
            <Route
                element={
                    <AppLayout>
                        <Outlet />
                    </AppLayout>
                }
            >
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Route>

            {/* =========================== 
                        Backend Route
            =============================== */}
            <Route
                path="/dashboard"
                element={
                    <AppLayout>
                        <Outlet />
                    </AppLayout>
                }
            >
                <Route index element={<Dashboard />} />
            </Route>
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default AppRoutes;
