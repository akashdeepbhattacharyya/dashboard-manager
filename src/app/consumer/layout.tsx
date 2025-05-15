import ConsumerDetails from "@/components/consumerDetails";
import ConsumerUpdate from "@/components/consumerUpdate";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      {children}
    </>

  );
}
