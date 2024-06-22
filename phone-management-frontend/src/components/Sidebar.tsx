
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserService } from "features/user/hooks";

const Sidebar = () => {
    const { logoutUser } = useUserService();
    const logout = () => {
        window.location.replace('/login');
        localStorage.clear();
        logoutUser()
    }
    return (
        <div className="sidebar d-flex flex-column justify-content-between">
            <div>
                <p> <Link to="/admin/addUser" className='text-secondary'> <i className='bx bx-plus' ></i> Ajouter Nouvel Agent</Link></p>

                <p><Link to="/admin/users" className='text-secondary'><i className='bx bxs-group'></i> Liste Totale des Agents</Link></p>
            </div>
            <div >
                <button className="btn" onClick={() => logout()}><i className='bx bx-log-out'></i> Deconnexion</button>
            </div>
        </div >
    );
};

export default Sidebar;
