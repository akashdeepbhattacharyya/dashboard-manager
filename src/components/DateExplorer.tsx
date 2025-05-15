import { Consumer, Measurement, VoltageData } from '@/interface/consumer';
import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';

type ConsumerProps = {
  data: Consumer;
};

const ITEMS_PER_PAGE = 10;

export default function DateExplorer({ data }: ConsumerProps) {
  const [explorer, setExplorer] = useState<Measurement[]>([]);
  const [activeExplorer, setActiveExplorer] = useState<number>();
  const [voltageData, setVoltageData] = useState<VoltageData>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const totalPages = Math.ceil(explorer.length / ITEMS_PER_PAGE);
  const [searchValue, setSearchValue] = useState<string>('');

 

  useEffect(() => {
    setExplorer(data?.explorer ?? []);
  }, [data]);

   useEffect(() => {
    if (data?.explorer.length > 0) {
      handleDetails(data?.explorer[0]);
    }
  }, []);
  useEffect(() => {
    const originalExplorer = data?.explorer ?? [];
    if (searchValue.trim() === '') {
      setExplorer(originalExplorer);
    } else {
      const filteredExplorer = originalExplorer.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setExplorer(filteredExplorer);
    }
  }, [searchValue]);

  const handleDetails = (data: Measurement) => {
    setActiveExplorer(data.id);
    setVoltageData(data.voltageData);
    setName(data.name);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedExplorer = explorer.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <div className="w-1/4 h-[90vh] ml-2 bg-white shadow-md rounded-md flex flex-col">
        {/* Scrollable Explorer List */}
        <div className="flex-1 overflow-y-auto">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search By Name"
                onChange={(e) => setSearchValue(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {paginatedExplorer.map((exp) => (
            <div key={exp.id} className="flex flex-col gap-2 p-4">
              <div
                className={`p-4 shadow-sm rounded-md ${activeExplorer === exp.id ? '!bg-blue-700 text-white' : 'bg-white'
                  } transition duration-300 ease-in-out cursor-pointer hover:bg-gray-200`}
                onClick={() => handleDetails(exp)}
              >
                <h1 className="text-lg font-bold">{exp.name}</h1>
                <p className={activeExplorer === exp.id ? 'text-white' : 'text-gray-600'}>
                  Logical Name: {exp.logical_name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="sticky bottom-0 bg-white p-3">
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 text-gray-700 disabled:text-gray-300"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${isActive
                      ? 'bg-gray-300 text-black font-semibold'
                      : 'text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 text-gray-700 disabled:text-gray-300"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>

      <ChartComponent data={voltageData} name={name} />
    </>
  );
}
