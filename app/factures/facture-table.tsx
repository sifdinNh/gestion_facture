'use client';

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
import Facture from '../types';
import { useRouter } from 'next/navigation';

export function FacturesTable({
    factures,
}: {
  factures: Facture[];
}) {
  console.log(factures)
  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">id</TableHead>
              <TableHead className="max-w-[150px]">No</TableHead>
              <TableHead className="hidden md:table-cell">Fournisseur</TableHead>
              <TableHead className="hidden md:table-cell">pdf</TableHead>
              <TableHead className="hidden md:table-cell">totalTTC</TableHead>
              <TableHead className="hidden md:table-cell">date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {factures.map((facture) => (
              <FactureRow key={facture.id} facture={facture} />
            ))}
          </TableBody>
        </Table>
      </form>
        <Button
          className="mt-4 w-40"
          variant="secondary">
          Next Page
        </Button>   
    </>
  );
}

const Badge = ({ text }) => {
    return (
        <div  className={clsx(
            "text-sm font-bold text-center px-3 rounded-full w-max",
            {
                "bg-indigo-200 text-indigo-800" : text == 'comptable',
                "bg-blue-200 text-blue-800" : text == "financier"
            }
        )}>{text}</div>
    );
};
  
function FactureRow({ facture }: { facture: Facture }) {
  const factureId = facture.id;

  return (
    <TableRow>
      <TableCell className="font-medium">{facture.id}</TableCell>
      <TableCell className="font-medium">{facture.No}</TableCell>
      <TableCell className="hidden md:table-cell">{facture.Fournisseur}</TableCell>
      <TableCell className="font-medium">{facture.pdf}</TableCell>
      <TableCell className="font-medium">{facture.totalTTC}</TableCell>
      <TableCell className="font-medium">{facture.date}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          disabled
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}