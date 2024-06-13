'use client';

import * as React from 'react'
import clsx from 'clsx';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { useInvoicesAPI } from '@/queries/client/invoices'

import { Button } from '@/components/ui/button';
import { Invoice } from '@/types/database'




export function ArchiveFacturesTable() {
  const [page, setPage] = React.useState<number>(1)
  const [perPage, setPerPage] = React.useState<number>(50)
  const { invoices } = useInvoicesAPI({page: page,perPage: perPage, isArchived : true})

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
            
              <TableHead className="max-w-[150px]">Num</TableHead>
              <TableHead className="hidden md:table-cell">TTC</TableHead>
              <TableHead className="hidden md:table-cell">dateEmission</TableHead>
              <TableHead className="hidden md:table-cell">dateEcheance</TableHead>
              <TableHead className="hidden md:table-cell">Statut</TableHead>

              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices?.map((invoice) => (
              <FactureRow key={invoice.id} facture={invoice} />
            ))}
          </TableBody>
        </Table>
      </form>
        <Button
          className="mt-4 w-40"
          variant="secondary">
         Suivant
        </Button>   

    </>
  );
}

const Badge = ({ text }) => {
    return (
        <div  className={clsx(
            "text-sm font-bold text-center px-3 rounded-full w-max",
            {
                "bg-blue-200 text-blue-800" : text == 'Phase 1',
                "bg-yellow-200 text-yellow-800" : text == 'Phase 2',
                "bg-red-500 text-black-800" : text =='Phase 3' ,
            }
        )}>{text}</div>
    );
};

  
function FactureRow({ facture }: { facture: Invoice }) {

  const handleInvoiceStatus = (_date_echeance : string) => {
    const date_echeance = new Date(_date_echeance);
    const currentDate = new Date();
    const timeDifference = date_echeance.getTime() - currentDate.getTime();
  
    // Convert time difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  
    if (daysDifference > 7) {
      return "Phase 1";
    } else if (daysDifference >= 0) {
      return "Phase 2";
    } else {
      return "Phase 3";
    }
  }
  
  return (
    <TableRow>
     
      <TableCell className="font-medium">{facture.no}</TableCell>
      <TableCell className="font-medium">{facture.total_ttc} DH</TableCell>
      <TableCell className="font-medium">{facture.date_emission}</TableCell>
      <TableCell className="font-medium">{facture.date_echeance}</TableCell>
      <TableCell className="hidden md:table-cell"><Badge text={handleInvoiceStatus(facture.date_echeance)}/></TableCell>
    </TableRow>
  );
}