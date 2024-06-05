"use client";

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
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';

export default function AddUserDialog() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
    <div className="fixed right-4">
        <Button onClick={() => setIsOpen(true)} variant="outline">Ajouter </Button>
    </div>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 sm:max-w-[425px]">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="max-w-lg space-y-4 bg-white p-12 rounded-lg">
          <DialogTitle className="font-bold">Admin</DialogTitle>
          <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom" className="text-right">
              Nom
            </Label>
            <Input
              id="nom"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prenom" className="text-right">
              Prenom
            </Label>
            <Input
              id="prenom"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className="bg-white w-[180px]">
                    <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="FI">Financier</SelectItem>
                        <SelectItem value="CO">Comptable</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type='email'
              className="col-span-3"
            />
          </div>
        </div> 
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password-1" className="text-right">
              mot de pass
            </Label>
            <Input
              id="password-1"
              type='password'
              className="col-span-3"
            />
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
