"use client";

import * as React from "react"
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format, addDays } from "date-fns";

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { DatePicker } from "@/components/ui/date-picker"
export default function AddFactureDialog() {
  let [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = React.useState<Date>()
  const [secondDate, setSecondDate] = React.useState<Date>()
  const handleDate = (date) => {
    setDate(date)
    setSecondDate(addDays(date, 60));
  }
  return (
    <>
    <div className="fixed right-4">
        <Button onClick={() => setIsOpen(true)} variant="outline">Ajouter</Button>
    </div>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 sm:max-w-[425px]">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="max-w-lg space-y-4 bg-white p-12 rounded-lg">
          <DialogTitle className="font-bold">Facture</DialogTitle>
          <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="numero" className="text-right">
              Num
            </Label>
            <Input
              id="numero"
              placeholder='Enter Facture numebr'
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ttc" className="text-right">
              TTC
            </Label>
            <Input
              id="ttc"
              type={"number"}
              step={0.1}
              placeholder="Enter Facture's TotalTTC"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="numero" className="text-right">
              Date emission
            </Label>
            <DatePicker date={date} setDate={handleDate}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="numero" className="text-right">
            date d'échéance
            </Label>
            <DatePicker date={secondDate} setDate={setSecondDate} disabled={true} />
          </div>

        </div> 
        <DialogFooter>
          <Button type="submit" >Enregistrer</Button>
        </DialogFooter>
        </DialogPanel>
      </div>
    </Dialog>
  </>
  )
}
