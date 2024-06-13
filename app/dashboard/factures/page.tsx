import { FacturesTable } from './facture-table';
import { factures } from '../../constatns'
import AddFactureDialog  from './add-facture-dialog'

export default function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Factures</h1>
      </div>
      <AddFactureDialog />
      <FacturesTable/>
    </main>
  );
}