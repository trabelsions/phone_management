import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import Dashboard from "pages/Dashboard/Dashboard";
import Users from "pages/ListAgent/Agents";
import AddUser from "pages/AddAgents/AddAgents";
import UpdateAgent from "pages/ModifAgents/ModifAgents"
const AdminLayout = (props) => {
    return (
        <div>
            <Navbar />

            <div className="admin-layout">
                <Sidebar />

                <div className="main-content">

                    <div className="content">

                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/addUser" element={<AddUser />} />
                            <Route path="/updateUser/:id" element={<UpdateAgent />} />
                            <Route path="*" element={<Navigate to="/admin/dashboard" />} />

                        </Routes>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
