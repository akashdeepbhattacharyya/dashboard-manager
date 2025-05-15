import React from 'react'

export default function Header() {
    return (
        <div className='bg-white  flex justify-between items-center p-4 shadow-md w-full  transition hover:shadow-lg'>
            <h1 className='font-bold text-black text-2xl'>Utility Dashboard</h1>
            <div className='flex gap-4'>
                <a href="">Consumers</a>
                <a href="">Reports</a>
                <a href="">Profile</a>
                <a href="">About</a>
            </div>
        </div>
    )
}
