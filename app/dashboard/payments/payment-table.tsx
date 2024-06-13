"use client";
import * as React from 'react'

import { usePaymentsAPI } from '@/queries/client/payments'
import clsx from 'clsx';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import  InvoiceDialog  from './invoice-dialog';
import  { Payment }  from '@/types/database';

export function PaymentTable() {
  const [page, setPage] = React.useState<number>(1)
  const [perPage, setPerPage] = React.useState<number>(50)
  const { payments } = usePaymentsAPI({page: page,perPage: perPage,})
  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">id</TableHead>
              <TableHead className="max-w-[150px]">Num</TableHead>
              <TableHead className="max-w-[150px]">TTC</TableHead>
              <TableHead className="max-w-[150px]">Penalite TTC</TableHead>
              <TableHead className="max-w-[150px]">Total TTC</TableHead>
              <TableHead className="max-w-[150px]">date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.map((payment) => (
              <PaymentRow key={payment.id} payment={payment} />
            ))}
          </TableBody>
        </Table>
      </form>
    </>
  );
}

const Badge = ({ penalty }) => {
    return (
        <div  className={clsx(
            "text-sm font-bold text-center px-3 rounded-full w-max",
            {
                "bg-green-400 text-white-800" : penalty == 0,
                "bg-red-600 text-black-400" : penalty > 0
            }
        )}>{penalty} DH</div>
    );
};
  
function PaymentRow({ payment }: { payment: Payment }) {
  const paymentId = payment.id;
  const created_at = new Date(payment.created_at).toISOString().split('T')[0]
  return (
    <TableRow>
      <TableCell className="font-medium">{payment.id}</TableCell>
      <TableCell className="font-medium">{payment.no}</TableCell>
      <TableCell className="font-medium">{payment.ttc} DH</TableCell>
      <TableCell className="font-medium">< Badge penalty={payment.penalty_ttc} /></TableCell>
      <TableCell className="font-medium">{payment.penalty_ttc + payment.ttc} DH</TableCell>
      <TableCell className="font-medium">{created_at}</TableCell>
      <TableCell>
        <InvoiceDialog payment={payment}/>
      </TableCell>
    </TableRow>
  );
}