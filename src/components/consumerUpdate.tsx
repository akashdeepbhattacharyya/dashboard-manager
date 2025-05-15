'use client';

import React, { useEffect, useMemo, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useFormik } from 'formik';
import { Consumer } from '@/interface/consumer';

type ConsumerProps = {
    data: Consumer;
};
export default function ConsumerUpdate({ data }: ConsumerProps) {
    console.log(data);
    const [isEditable, setIsEditable] = useState(false);
    const initialValues = useMemo(() => ({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        mru: data.mru || '',
        pollNumber: data.poleNumber || '',
        consumption: data.consumption || '',
        consumerId: data.id || '',
        di: data.di || '',
        subDivision: data.subDivision || '',
        multiplyingFactor: data.multiplyingFactor || '',
    }), [data]);
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('Submitted:', values);
            setIsEditable(false);
        },
    });

    return (
        <div className="flex flex-col gap-4 p-4 w-3/4 mx-auto float-right bg-white">
            <div className="flex justify-between items-center p-4 w-full border-b border-gray-400">
                <h1 className="font-bold text-black text-2xl">Consumer Details</h1>
                {isEditable ? (
                    <button
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
                        type="submit"
                        onClick={() => formik.handleSubmit()}
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
                        type="button"
                        onClick={() => setIsEditable(true)}
                    >
                        Edit
                    </button>
                )}
            </div>
            <form onSubmit={formik.handleSubmit}>

                <div className="bg-white flex justify-between items-center p-4 border border-gray-300 w-full transition">
                    <h1 className="font-bold text-black text-xl">This month Consumption</h1>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer">
                        {initialValues.consumption}Unit
                    </button>
                </div>

                <div className="bg-white flex p-4 border border-gray-300 w-full transition">
                    Traffic Applied <EditOutlinedIcon color="action" />
                </div>

                <div className="border-b border-gray-300 space-y-4">
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            className={`${!isEditable ? 'bg-gray-400' : 'bg-gray-300'} w-full p-2`}
                            type="text"
                            id="name"
                            {...formik.getFieldProps('name')}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className={`${!isEditable ? 'bg-gray-400' : 'bg-gray-300'} w-full p-2`}
                            id="email"
                            {...formik.getFieldProps('email')}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            className={`${!isEditable ? 'bg-gray-400' : 'bg-gray-300'} w-full p-2`}
                            id="phone"
                            {...formik.getFieldProps('phone')}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className={`${!isEditable ? 'bg-gray-400' : 'bg-gray-300'} w-full p-2`}
                            id="address"
                            {...formik.getFieldProps('address')}
                            readOnly={!isEditable}
                        />
                    </div>
                </div>

                <div className="space-y-4 mt-4">
                    <div>
                        <label htmlFor="consumerId">Consumer ID</label>
                        <input
                            type="text"
                            className={`${!isEditable ? 'bg-gray-400' : 'bg-gray-300'} w-full p-2`}
                            id="consumerId"
                            {...formik.getFieldProps('consumerId')}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div>
                        <label htmlFor="subdivision">Subdivision</label>
                        <input
                            type="text"
                            className={`${!isEditable ? 'bg-gray-400' : 'bg-gray-300'} w-full p-2`}
                            id="subdivision"
                            {...formik.getFieldProps('subdivision')}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div>
                        <label htmlFor="dt">DT</label>
                        <input
                            type="text"
                            className={`${!isEditable ? 'bg-gray-400' : 'bg-gray-300'} w-full p-2`}
                            id="dt"
                            {...formik.getFieldProps('dt')}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div>
                        <label htmlFor="mru">MRU</label>
                        <input
                            type="text"
                            className={`${!isEditable ? 'bg-gray-400' : 'bg-gray-300'} w-full p-2`}
                            id="mru"
                            {...formik.getFieldProps('mru')}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div>
                        <label htmlFor="pollNumber">Poll Number</label>
                        <input
                            type="text"
                            className={`${!isEditable ? 'bg-gray-400' : 'bg-gray-300'} w-full p-2`}
                            id="pollNumber"
                            {...formik.getFieldProps('pollNumber')}
                            readOnly={!isEditable}
                        />
                    </div>

                    <div>
                        <label htmlFor="multiplyingFactor">Multiplying Factor</label>
                        <input
                            type="text"
                            className={`${!isEditable ? 'bg-gray-400' : 'bg-gray-300'} w-full p-2`}
                            id="multiplyingFactor"
                            {...formik.getFieldProps('multiplyingFactor')}
                            readOnly={!isEditable}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
