import React from 'react';
import { Link } from 'react-router-dom';

const Tab = ({ to, label, activeTab, onClick }) => {
  const isActive = to === activeTab;

  return (
    <li className={`mr-4 ${isActive ? 'border-b-2 border-blue-500' : ''}`}>
      <Link
        to={to}
        onClick={() => onClick(to)}
        className={`block py-2 px-4 text-sm font-semibold ${isActive ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
      >
        {label}
      </Link>
    </li>
  );
};

const Tabs = ({ tabs, activeTab, onTabClick }) => {
  return (
      <ul className="flex border-b border-b-slate-400 my-3 w-full">
        {tabs.map((tab) => (
          <Tab key={tab.to} to={tab.to} label={tab.label} activeTab={activeTab} onClick={onTabClick} />
        ))}
      </ul>
  );
};

export default Tabs;
