import React from "react";
import { Logo } from '@/components/icons';
// Components
import InvoiceLayout from "./InvoiceLayout";

// Helpers

// Variables

// Types
import { Payment } from "../../../types";

const InvoiceTemplate = ({ data, } : { data : Payment }) => {

    return (
        <InvoiceLayout data={data}>
            <div className="flex justify-between">
                <div>
                <Logo />
                    <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600">
                        ACME
                    </h1>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        Invoice #
                    </h2>
                    <span className="mt-1 block text-gray-500">
                        {data.number}
                    </span>
                    <address className="mt-4 not-italic text-gray-800">
                        sidi moumen hay zbi
                        <br />
                        2400, casablanca
                        <br />
                        maroc
                        <br />
                    </address>
                </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        Bill to:
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-800">
                        rabi zamel
                    </h3>
                    <address className="mt-2 not-italic text-gray-500">
                        azmour dzb, 2400
                        <br />
                        Azmour, maroc
                        <br />
                    </address>
                </div>
                <div className="sm:text-right space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                        <dl className="grid sm:grid-cols-6 gap-x-3">
                            <dt className="col-span-3 font-semibold text-gray-800">
                                Invoice date:
                            </dt>
                            <dd className="col-span-3 text-gray-500">
                                {new Date(
                                    "11/02/2022"
                                ).toLocaleDateString("en-US")}
                            </dd>
                        </dl>
                        <dl className="grid sm:grid-cols-6 gap-x-3">
                            <dt className="col-span-3 font-semibold text-gray-800">
                                Due date:
                            </dt>
                            <dd className="col-span-3 text-gray-500">
                                {new Date("11/02/2022").toLocaleDateString("en-US")}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="border border-gray-200 p-1 rounded-lg space-y-1">
                    <div className="hidden sm:grid sm:grid-cols-5">
                        <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                            Item
                        </div>
                        <div className="text-left text-xs font-medium text-gray-500 uppercase">
                            Qty
                        </div>
                        <div className="text-left text-xs font-medium text-gray-500 uppercase">
                            Rate
                        </div>
                        <div className="text-right text-xs font-medium text-gray-500 uppercase">
                            Amount
                        </div>
                    </div>
                    <div className="hidden sm:block border-b border-gray-200"></div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-1">
                                <div className="col-span-full sm:col-span-2">
                                    <p className="font-medium text-gray-800">
                                        chi haja
                                    </p>

                                </div>
                                <div >
                                    <p className="text-gray-800">
                                        1
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-800">
                                        {data.ttc} DH
                                    </p>
                                </div>
                                <div >
                                    <p className="sm:text-right text-gray-800">
                                        {data.ttc} DH
                                    </p>
                                </div>
                    </div>
                </div>
            </div>

            <div className="mt-2 flex sm:justify-end">
                <div className="sm:text-right space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                        <dl className="grid sm:grid-cols-5 gap-x-3">
                            <dt className="col-span-3 font-semibold text-gray-800">
                                Subtotal:
                            </dt>
                            <dd className="col-span-2 text-gray-500">
                                {data.ttc}
                                DH
                            </dd>
                        </dl>
                        <dl className="grid sm:grid-cols-5 gap-x-3">
                            <dt className="col-span-3 font-semibold text-gray-800">
                                Total:
                            </dt>
                            <dd className="col-span-2 text-gray-500">
                            {data.ttc}
                                DH
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div>
                <div className="my-4">
                    <div className="my-2">
                        <p className="font-semibold text-blue-600">
                            Additional notes:
                        </p>
                        <p className="font-regular text-gray-800">
                            zbi zidd chi haja hna
                        </p>
                    </div>
                    <div className="my-2">
                        <p className="font-semibold text-blue-600">
                            Payment terms:
                        </p>
                        <p className="font-regular text-gray-800">
                            sir t7wa
                        </p>
                    </div>
                    <div className="my-2">
                        <span className="font-semibold text-md text-gray-800">
                            Please send the payment to this address
                            <p className="text-sm">
                                Bank: cih hh
                            </p>
                            <p className="text-sm">
                                Account name:idk    
                            </p>
                            <p className="text-sm">
                                Account no:idk hh
                            </p>
                        </span>
                    </div>
                </div>
                <p className="text-gray-500 text-sm">
                    If you have any questions concerning this invoice, use the
                    following contact information:
                </p>
                <div>
                    <p className="block text-sm font-medium text-gray-800">
                        amce@example.com
                    </p>
                    <p className="block text-sm font-medium text-gray-800">
                        +2126-53443434
                    </p>
                </div>
            </div>
        </InvoiceLayout>
    );
};

export default InvoiceTemplate;