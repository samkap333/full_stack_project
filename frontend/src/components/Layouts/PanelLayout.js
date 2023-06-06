import React from 'react'
import Navbar from '../Navbar';

import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
function PanelLayout() {
    return (
        <>
        <div className="wrapper">
            <Sidebar />
            <div className="main panelLayout">
                <Navbar />
                <main className="content">
                    <Outlet />
                </main>
                
            </div>
            </div>
        </>
    )
}
export default PanelLayout;
