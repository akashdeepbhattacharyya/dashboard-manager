import { VoltageData } from '@/interface/consumer'
import { MenuItem, Select } from '@mui/material';
import React, { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

type props = {
    data: VoltageData | undefined,
    name: string
}
export default function ChartComponent({ data, name }: props) {
    const [selectedFrame, setSelectedFrame] = useState('This Week');

    const mainData = Array.isArray(data?.[selectedFrame]) ? data[selectedFrame] : [];
    const timeFrames = Object.keys(data ?? {});

    return (
        <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
            <div className="flex justify-between items-center mb-4">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedFrame}
                    className='w-full text-black'
                    label="Age"
                   onChange={(e) => setSelectedFrame(e.target.value)}
                >
                    {timeFrames.map((frame) => (
                        <MenuItem  key={frame} value={frame}>
                            {frame}
                        </MenuItem >
                    ))}
                </Select>
                <div className="flex gap-2">
                    <button className="text-gray-600 hover:text-black" title="Download">
                        ⬇️
                    </button>
                    <button className="text-gray-600 hover:text-black" title="Copy">
                        📋
                    </button>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">{name}</h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mainData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[200, 250]} />
                    <Tooltip
                        formatter={(value: number) => `${value.toFixed(2)} V`} // ✅ This is valid
                    />
                    <Line
                        type="monotone"
                        dataKey="voltage"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
