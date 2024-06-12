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
import { useCreateUser } from '@/queries/client/users'


export default function AddUserDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const { createUser, isLoading, error } = useCreateUser();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    role: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRoleChange = (role : string) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nom, prenom, role, email, password } = formData;
    try {
      const { data: data, error } = await createUser({
        email,
        password,
        user_metadata: {
          first_name : nom,
          last_name : prenom,
          role,
        },
      });
      if (error) {
        console.error('Error creating user:', error);
      } else {
        console.log('User created successfully:', data);
        setIsOpen(false); // Close the dialog on success
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <>
      <div className="fixed right-4">
        <Button onClick={() => setIsOpen(true)} variant="outline">Ajouter </Button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 sm:max-w-[425px]">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 bg-white p-12 rounded-lg">
            <DialogTitle className="font-bold">gestionnaire</DialogTitle>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nom" className="text-right">
                    Nom
                  </Label>
                  <Input
                    id="nom"
                    className="col-span-3"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prenom" className="text-right">
                    Prenom
                  </Label>
                  <Input
                    id="prenom"
                    className="col-span-3"
                    value={formData.prenom}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select onValueChange={handleRoleChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="bg-white w-[180px]">
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="Financier">Financier</SelectItem>
                        <SelectItem value="Comptable">Comptable</SelectItem>
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
                    type="email"
                    className="col-span-3"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    mot de pass
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="col-span-3"
                    value={formData.password}
                    onChange={handleChange}
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
  )
}
