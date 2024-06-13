import { ReactNode } from "react";

// Types
import  { Payment }  from '@/types/database';

type InvoiceLayoutProps = {
    data: Payment;
    children: ReactNode;
};

export default function InvoiceLayout({ children }: InvoiceLayoutProps) {



    return (
        <>
            <section style={{ fontFamily: "Outfit, sans-serif" }}>
                <div className="flex flex-col p-4 sm:p-10 bg-white rounded-xl min-h-[60rem]">
                    {children}
                </div>
            </section>
        </>
    );
}