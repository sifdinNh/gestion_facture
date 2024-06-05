"use client";

import {  Dialog, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Payment } from '../../types'
import  InvoiceTemplate  from './invoice-template/InvoiceTemplate'

export default function InvoiceDialog({ payment } : { payment : Payment}) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
    <Button type={'button'} onClick={() => setIsOpen(true)} variant="outline">Display Invoice</Button>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 sm:max-w-[425px]">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="max-w space-y-4 bg-white p-12 rounded-lg">
          <InvoiceTemplate data={payment}/>
        </DialogPanel>
      </div>
    </Dialog>
  </>
  )
}
