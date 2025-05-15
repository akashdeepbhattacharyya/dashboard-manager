'use client';

import { useSelector } from "react-redux";
import ConsumerUpdate from "@/components/consumerUpdate";
import { accountStateItem } from "@/lib/features/data/dataSlice";
import DateExplorer from "./DateExplorer";
import TransactionSummary from "./TransactionSummary";

export default function ConsumerClient() {
    const consumerData = useSelector(accountStateItem);
    console.log(consumerData, 'consumerData');

    return (
        <>
            {consumerData?.type === 'details' && (
                <ConsumerUpdate data={consumerData.data} />
            )}
            {consumerData?.type === 'dateExplorer' && (
                <DateExplorer data={consumerData.data} />
            )}
            {
                consumerData?.type === 'Summary' && (
                    <TransactionSummary data={consumerData.data} />
                )
            }
        </>
    );
}
