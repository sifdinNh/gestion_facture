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
                        IMACID
                    </h1>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        Facture #
                    </h2>
                    <span className="mt-1 block text-gray-500">
                        {data.number}
                    </span>
                    <address className="mt-4 not-italic text-gray-800">
                        sidi moumen hay riad
                        <br />
                        24000, casablanca
                        <br />
                        Maroc
                        <br />
                    </address>
                </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                    Fournisseur:
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-800">
                        ATB
                    </h3>
                    <address className="mt-2 not-italic text-gray-500">
                        jorf lasfar, 24100
                        <br />
                        Eljadia , Maroc
                        <br />
                    </address>
                </div>
                <div className="sm:text-right space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                        <dl className="grid sm:grid-cols-6 gap-x-3">
                            <dt className="col-span-3 font-semibold text-gray-800">
                               date:
                            </dt>
                            <dd className="col-span-3 text-gray-500">
                                {new Date(
                                    "10/02/2024"
                                ).toLocaleDateString("en-US")}
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
                        
                        <div className="text-right text-xs font-medium text-gray-500 uppercase">
                            TTC
                        </div>
                    </div>
                    <div className="hidden sm:block border-b border-gray-200"></div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-1">
                                <div className="col-span-full sm:col-span-2">
                                    <p className="font-medium text-gray-800">
                                        Produit
                                    </p>

                                </div>
                                <div >
                                    <p className="text-gray-800">
                                        1
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
                             pénalité:
                            </dt>
                            <dd className="col-span-2 text-gray-500">
                                {data.pen}
                                DH
                            </dd>
                        </dl>
                        <dl className="grid sm:grid-cols-5 gap-x-3">
                            <dt className="col-span-3 font-semibold text-gray-800">
                                Total:
                            </dt>
                            <dd className="col-span-2 text-gray-500">
                            {data.tt}
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
                             notes:
                        </p>
                        <p className="font-regular text-gray-800">
                        Si vous avez des suggestions sur la façon dont nous pouvons améliorer nos services, n'hésitez pas à nous le faire savoir.
                        </p>
                    </div>
                    
                    <div className="my-2">
                        <span className="font-semibold text-md text-gray-800">
                        Veuillez envoyer le paiement à cette adresse
                            <p className="text-sm">
                                Bank: BMCE
                            </p>
                            <p className="text-sm">
                                RIB:6565679766999696969

                            </p>
                           
                        </span>
                    </div>
                </div>
                <p className="text-gray-500 text-sm">
                Si vous avez des questions concernant cette facture, contactez-nous ici :
                </p>
                <div>
                    <p className="block text-sm font-medium text-gray-800">
                        contact@imacid.com
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