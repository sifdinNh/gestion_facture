"use client";

import clsx from 'clsx';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Payment } from '../../types';
import { useRouter } from 'next/navigation';
import  InvoiceDialog  from './invoice-dialog';

export function PaymentTable({
  payments,
}: {
  payments: Payment[];
}) {
  const router = useRouter();

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">No</TableHead>
              <TableHead className="max-w-[150px]">TTC</TableHead>
              <TableHead className="max-w-[150px]">date</TableHead>
              <TableHead className="max-w-[150px]">penalites</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <PaymentRow key={payment.id} payment={payment} />
            ))}
          </TableBody>
        </Table>
      </form>
    </>
  );
}

const Badge = ({ text }) => {
    return (
        <div  className={clsx(
            "text-sm font-bold text-center px-3 rounded-full w-max",
            {
                "bg-red-400 text-black-800" : text == 'penality 1',
                "bg-blue-200 text-blue-800" : text == "penality 2"
            }
        )}>{text}</div>
    );
};
  
function PaymentRow({ payment }: { payment: Payment }) {
  const paymentId = payment.id;

  return (
    <TableRow>
      <TableCell className="font-medium">{payment.number}</TableCell>
      <TableCell className="font-medium">{payment.ttc}</TableCell>
      <TableCell className="font-medium">{payment.date}</TableCell>
      <TableCell>< Badge text={payment.penalty} /></TableCell>
      <TableCell>
        <InvoiceDialog payment={payment}/>
      </TableCell>
    </TableRow>
  );
}