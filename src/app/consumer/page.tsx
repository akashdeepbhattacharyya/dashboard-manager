import ConsumerUpdate from "@/components/consumerUpdate";
import Header from "@/components/header";
import { useSelector } from "react-redux";
import { accountStateItem } from "@/lib/features/data/dataSlice";
import ConsumerClient from "@/components/ConsumerClient";
import ConsumerDetails from "@/components/consumerDetails";

export default function Consumer() {
    return (
        <div className="flex">
            <ConsumerDetails />
            <ConsumerClient />

        </div>
    );
}