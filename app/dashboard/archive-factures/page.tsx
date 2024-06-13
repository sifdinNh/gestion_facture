import { ArchiveFacturesTable } from './facture-table';

export default function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">AArchived Factures</h1>
      </div>
      <ArchiveFacturesTable/>
    </main>
  );
}