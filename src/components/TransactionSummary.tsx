import { Consumer } from '@/interface/consumer';
import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type ConsumerProps = {
  data: Consumer;
};

export default function TransactionSummary({ data }: ConsumerProps) {
  console.log(data.transactions);

  return (
    <div className='flex bg-white w-full justify-center flex-col p-4 shadow-md'>
      <h1 className='font-bold text-black text-2xl'>Transaction Summary</h1>
      <div className='w-full max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md'>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data.transactions} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="billPayments" stroke="#8884d8" name="Bill Payments" />
            <Line type="monotone" dataKey="recharges" stroke="#82ca9d" name="Prepaid Recharges" />
            <Line type="monotone" dataKey="complaints" stroke="#ff7300" name="Complaints" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}
