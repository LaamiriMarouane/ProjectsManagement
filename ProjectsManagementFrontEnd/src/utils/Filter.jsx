import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

const Filter = ({ themes, types, onFilterChange, onSortChange }) => {

    const handleSortChange = (e) => {
        const sortOption = e.target.value;
        onSortChange(sortOption);
    };

    return (
        <div className="mb-4 flex items-center justify-between">
            <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold'>Filter by Type :</span>
                <select onChange={(e) => onFilterChange(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 py-1 px-2 cursor-pointer text-xs font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block'>
                    <option selected value="" className='font-semibold'>All Types</option>
                    {types.map((type) => (
                        <option className='font-semibold' key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold'>Filter by Theme :</span>
                <select className='bg-gray-50 border border-gray-300 text-gray-900 py-1 px-2 cursor-pointer text-xs font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block'>
                    <option selected value="" className='font-semibold'>All Themes</option>
                    {themes.map((theme) => (
                        <option className='font-semibold' key={theme} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex items-center gap-2'>
                <span className='text-sm font-semibold'>Sort :</span>
                <select onChange={handleSortChange} className='bg-gray-50 border border-gray-300 text-gray-900 p-1 cursor-pointer text-xs font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block'>
                    <option value="creationDate">Sort by Creation Date</option>
                    <option value="updateDate">Sort by Update Date</option>
                </select>
            </div>
            <input
                className="text-base placeholder:italic placeholder:text-slate-600 block bg-white border border-slate-300 rounded-full py-2 px-3 focus:outline-none sm:text-sm"
                placeholder="Search for Projects"
                type="text"
                name="search"
            />
        </div>
    );
};

export default Filter;
