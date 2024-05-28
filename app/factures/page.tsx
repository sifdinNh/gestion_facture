import { FacturesTable } from './facture-table';
import { factures } from '../constatns'
import { Button } from '@/components/ui/button';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const offset=1

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Factures</h1>
      </div>
      <div className="fixed right-4">
        <Button variant="outline">Add Facture</Button>
      </div>
      <FacturesTable factures={factures}/>
    </main>
  );
}