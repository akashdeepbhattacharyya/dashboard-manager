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