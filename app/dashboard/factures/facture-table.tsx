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

import { fetcher } from '@/lib/utils'
import { InvoiceAPI } from '@/types/api'
import { toast, Toaster } from 'sonner'


export function FacturesTable() {
  const [page, setPage] = React.useState<number>(1)
  const [perPage, setPerPage] = React.useState<number>(50)
  const { invoices } = useInvoicesAPI({page: page,perPage: perPage,})

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              
              <TableHead className="max-w-[150px]">ID</TableHead>
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
        <Toaster position="bottom-right" richColors   />

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
  const [isArchiveClick, setIsArchiveClick] = React.useState(false)
  const [isPayedClick, setIsPayedClick] = React.useState(false)

  const handleArchiveInvoice = async (e) => {
    setIsArchiveClick(true)
    try {
      const fetchUrl = `/api/v1/invoices?id=${facture.id}`
      const { data: message, error } = await fetcher(fetchUrl, {
        method: 'PATCH',
        body: JSON.stringify({
          data: { is_archived : true },
        }),
      })
  
      if (error) throw new Error(error?.message)
      toast.success(message)
    } catch (e: unknown) {
      toast.error((e as Error)?.message)
    }
    setIsArchiveClick(false)
  }

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

  const onPayment = async (e) => {
    e.preventDefault()
    setIsPayedClick(true)
    const increment_amount = 100;
    const date_echeance = new Date(facture.date_echeance);
    const currentDate = new Date();
    const penalty = ''
    let penalty_ttc = 0; 
    if(currentDate > date_echeance) {
      const differenceInMillis = currentDate.getTime() - date_echeance.getTime();
    
      // Convert milliseconds to days
      const millisecondsInDay = 1000 * 60 * 60 * 24;
      const differenceInDays = Math.round(differenceInMillis / millisecondsInDay) - 1

      penalty_ttc =  differenceInDays == 0 ? 1 : increment_amount * differenceInDays
    }

    try {
      const fetchUrl = `/api/v1/payments/list?invoiceId=${facture.id}`
      const { data: message, error } = await fetcher(fetchUrl, {
        method: 'POST',
        body: JSON.stringify({
          data: { 
            no : facture.no,
            penalty_ttc : penalty_ttc,
            penalty : penalty,
            ttc : facture.total_ttc,
          },
        }),
      })
  
      if (error) throw new Error(error?.message)
      toast.success(message)
    } catch (e: unknown) {
      toast.error((e as Error)?.message)
    }

    console.log(penalty_ttc)
    setIsPayedClick(false)    
  }
  
  return (
    <TableRow>
     
      <TableCell className="font-medium">{facture.id}</TableCell>
      <TableCell className="font-medium">{facture.no}</TableCell>
      <TableCell className="font-medium">{facture.total_ttc} DH</TableCell>
      <TableCell className="font-medium">{facture.date_emission}</TableCell>
      <TableCell className="font-medium">{facture.date_echeance}</TableCell>
      <TableCell className="hidden md:table-cell"><Badge text={handleInvoiceStatus(facture.date_echeance)}/></TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          disabled={isArchiveClick}
          onClick={handleArchiveInvoice}
        >
          Archiver
        </Button>
      </TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          onClick={onPayment}
          disabled={isPayedClick}
        >
          Payer
        </Button>
      </TableCell>
    </TableRow>
  );
}