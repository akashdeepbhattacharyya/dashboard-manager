'use client';

import { consumers } from '@/app/data/data';
import { Consumer } from '@/interface/consumer';
import { setData } from '@/lib/features/data/dataSlice';
import { AppDispatch } from '@/lib/store';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

const ITEMS_PER_PAGE = 10;

export default function ConsumerDetails() {
    const [consumersData, setConsumersData] = useState<Consumer[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeConsumer, setActiveConsumer] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const totalPages = Math.ceil(consumersData.length / ITEMS_PER_PAGE);
    const [pageType, setPageType] = useState<string>('details');

    useEffect(() => {
        if (consumers.length > 0) {
            setConsumersData(consumers);
            handleDetails(consumers[0]);
        }
    }, [consumers]);

    const [searchValue, setSearchValue] = useState<string>('');
    useEffect(() => {
        const originalExplorer = consumers ?? [];
        if (searchValue.trim() === '') {
            setConsumersData(originalExplorer);
        } else {
            const filteredExplorer = originalExplorer.filter((item) =>
                item.mru.toLowerCase().includes(searchValue.toLowerCase())
            );
            setConsumersData(filteredExplorer);
        }
    }, [searchValue]);
    const currentData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return consumersData.slice(start, end);
    }, [consumersData, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);

    };
    const handleDetails = (data: Consumer) => {
        setActiveConsumer(data.id);
        handleConsumerDetails(data);
    }
    const handleSummary = (data: Consumer) => {
        setPageType('Summary');

        dispatch(
            setData({
                type: 'Summary',
                data: data,
            })
        );
    }
    const handleConsumerDetails = (data: Consumer) => {
        setPageType('details');
        dispatch(
            setData({
                type: 'details',
                data: data,
            })
        );
    }
    const handleDateExplorer = (data: Consumer) => {
        setPageType('dateExplorer');

        dispatch(
            setData({
                type: 'dateExplorer',
                data: data,
            })
        );
    }


    return (
        <div className="w-1/4 h-[90vh] bg-white shadow-md rounded-md flex flex-col">
            {/* Scrollable Consumer List */}
            <div className="flex-1 overflow-y-auto">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search device_serial"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>


                    <button className="px-4 py-2  bg-gray-300 text-white text-sm font-medium rounded-md hover:bg-blue-700 w-full  flex items-center mb-0.5 mt-0.5">
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add a consumer
                    </button>

                    <button className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 w-full flex items-center">
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        Bulk Upload
                    </button>
                </div>
                {currentData.map((consumer) => (
                    <div key={consumer.id} className='flex flex-col gap-2 p-4'>

                        <div
                            key={consumer.id}
                            className={`p-4 bg-gray-100 shadow-sm rounded-md ${activeConsumer === consumer.id ? '!bg-blue-700 text-white' : 'bg-white'} transition duration-300 ease-in-out cursor-pointer hover:bg-gray-200`}
                            onClick={() => { handleDetails(consumer) }}
                        >

                            <h1 className="text-lg font-bold">{consumer.name}</h1>
                            <p className={`${activeConsumer === consumer.id ? '! text-white' : 'text-gray-600'} `}>Id: {consumer.id}</p>
                            <p className={` ${activeConsumer === consumer.id ? '! text-white' : 'text-gray-600'} `}>Device SI No: {consumer.mru}</p>
                        </div>

                        {activeConsumer === consumer.id && (
                            <div className=" bg-gray-200 p-4 rounded-md">
                                <div className='cursor-pointer flex items-center flex-row gap-1' onClick={() => handleConsumerDetails(consumer)}>
                                    {pageType === 'details' &&
                                        <div className='w-2 h-2 bg-indigo-600' style={{ borderRadius: '50%' }} />

                                    }

                                    Details</div>
                                <div className='cursor-pointer flex items-center flex-row gap-1' onClick={() => handleSummary(consumer)}>
                                    {pageType === 'Summary' &&
                                        <div className='w-2 h-2 bg-indigo-600' style={{ borderRadius: '50%' }} />

                                    }
                                    Transaction Summary</div>
                                <div className='cursor-pointer flex items-center flex-row gap-1' onClick={() => handleDateExplorer(consumer)}>
                                    {pageType === 'dateExplorer' &&
                                        <div className='w-2 h-2 bg-indigo-600' style={{ borderRadius: '50%' }} />

                                    }
                                    Date Explorer</div>
                            </div>
                        )}
                    </div>

                ))}
            </div>

            {/* Fixed Pagination at Bottom */}
            <div className="sticky bottom-0 bg-white border-t p-3">
                <div className="flex justify-center items-center gap-2">
                    {/* Prev Arrow */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-2 text-gray-700 disabled:text-gray-300 cursor-pointer"
                    >
                        &lt;
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1;
                        const isActive = page === currentPage;
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${isActive
                                    ? 'bg-gray-300 text-black font-semibold'
                                    : 'text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {page}
                            </button>
                        );
                    })}

                    {/* Next Arrow */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-2 text-gray-700 disabled:text-gray-300 cursor-pointer"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}
