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
import { Facture } from '../types';
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
            
              <TableHead className="max-w-[150px]">Num</TableHead>
              <TableHead className="hidden md:table-cell">TTC</TableHead>
              <TableHead className="hidden md:table-cell">dateEmission</TableHead>
              <TableHead className="hidden md:table-cell">dateEcheance</TableHead>
              <TableHead className="hidden md:table-cell">Statut</TableHead>

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
                "bg-blue-200 text-blue-800" : text == 'A',
                "bg-yellow-200 text-yellow-800" : text == 'B',
                "bg-red-500 text-black-800" : text == "C"
            }
        )}>{text}</div>
    );
};
  
function FactureRow({ facture }: { facture: Facture }) {
  const factureId = facture.id;

  return (
    <TableRow>
     
      <TableCell className="font-medium">{facture.No}</TableCell>
      <TableCell className="font-medium">{facture.totalTTC} DH</TableCell>
      <TableCell className="font-medium">{facture.dateEmission}</TableCell>
      <TableCell className="font-medium">{facture.dateEcheance}</TableCell>
      <TableCell className="hidden md:table-cell"><Badge text={facture.statut}/></TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          disabled
        >
          Supprimer
        </Button>
      </TableCell>
    </TableRow>
  );
}