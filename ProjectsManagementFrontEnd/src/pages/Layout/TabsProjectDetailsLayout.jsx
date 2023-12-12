import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Tabs from '../../utils/Tabs';

const TabsProjectDetailsLayout = () => {
    const [activeTab, setActiveTab] = useState('/user/details');

    const tabs = [
        { to: '/user/details', label: 'About' },
        { to: '/user/details/ressources', label: 'Ressources' },
        { to: '/user/details/agenda', label: 'Agenda' },
        { to: '/user/details/membres', label: 'Membres' },
    ];

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div className="mt-16">
            <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
            <div className="h-full w-full mt-4">
                <Outlet />
            </div>
        </div>
    )
}

export default TabsProjectDetailsLayout