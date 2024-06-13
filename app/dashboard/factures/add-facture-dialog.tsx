"use client";

import * as React from "react"
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { addDays } from "date-fns";
import { fetcher } from '@/lib/utils'
import { InvoiceAPI } from '@/types/api'
import { toast } from 'sonner'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { DatePicker } from "@/components/ui/date-picker"
export default function AddFactureDialog() {
  let [isOpen, setIsOpen] = useState(false)
  const [dateEmission, setDateEmission] = React.useState<Date>()
  const [dateEcheance, setDateEcheance] = React.useState<Date>()


  const [formData, setFormData] = useState({
    no: '',
    total_ttc: '',
    dateEmission: null,
    dateEcheance: null,
    receiver_name: '',
    receiver_address: '',
    receiver_zip_code: '',
    receiver_country: '',
});


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [id]: value,
    }));
};

const handleDate = (date) => {
  const _date_echeance = addDays(date, 60)
  setDateEmission(date)
  setDateEcheance(_date_echeance);
  setFormData((prevData) => ({
    ...prevData,
    date_emission: date,
    date_echeance: _date_echeance,
}));
}

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const fetchUrl = `/api/v1/invoices/list`
      const { data: post, error } = await fetcher<InvoiceAPI>(fetchUrl, {
        method: 'POST',
        body: JSON.stringify({
          data: { ...formData },
        }),
      })

      if (error) throw new Error(error?.message)
      setIsOpen(false)
    } catch (e: unknown) {
      toast.error((e as Error)?.message)
    }



  }

  return (
    <>
        <div className="fixed right-4">
            <Button onClick={() => setIsOpen(true)} variant="outline">Ajouter</Button>
        </div>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 sm:max-w-[600px]">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-2xl space-y-4 bg-white p-12 rounded-lg">
                    <DialogTitle className="font-bold">Facture</DialogTitle>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="no" className="text-right">
                                Num
                            </Label>
                            <Input
                                id="no"
                                placeholder='Enter Facture number'
                                className="col-span-3"
                                value={formData.no}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="total_ttc" className="text-right">
                                TTC
                            </Label>
                            <Input
                                id="total_ttc"
                                type="number"
                                step={0.1}
                                placeholder="Enter Facture's Total TTC"
                                className="col-span-3"
                                value={formData.total_ttc}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dateEmission" className="text-right">
                                Date emission
                            </Label>
                            <DatePicker date={dateEmission} setDate={handleDate} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dateEcheance" className="text-right">
                                Date d'échéance
                            </Label>
                            <DatePicker date={dateEcheance} setDate={setDateEcheance} disabled />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="receiver_name" className="text-right">
                                Receiver Name
                            </Label>
                            <Input
                                id="receiver_name"
                                placeholder='Enter Receiver Name'
                                className="col-span-3"
                                value={formData.receiver_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="receiver_address" className="text-right">
                                Receiver Address
                            </Label>
                            <Input
                                id="receiver_address"
                                placeholder='Enter Receiver Address'
                                className="col-span-3"
                                value={formData.receiver_address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center ">
                          <div className="col-span-2 flex items-center gap-4">
                            <Label htmlFor="receiver_zip_code" className="text-center">
                                Zip Code
                            </Label>
                            <Input
                                id="receiver_zip_code"
                                placeholder='Enter Zip Code'
                                value={formData.receiver_zip_code}
                                onChange={handleInputChange}
                            />
                          </div>
                          <div className="col-span-2 flex items-center gap-4 ml-4">
                          <Label htmlFor="receiver_country" className="text-center">
                                Country
                            </Label>
                            <Input
                                id="receiver_country"
                                placeholder='Enter Country'
            
                                value={formData.receiver_country}
                                onChange={handleInputChange}
                            />
                          </div>

                        </div>
                        <DialogFooter>
                            <Button type="submit">Enregistrer</Button>
                        </DialogFooter>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    </>
  );
}
