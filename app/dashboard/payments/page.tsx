import { PaymentTable } from './payment-table';
import { payments } from '../../constatns'

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const offset = 1;
  
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Payments</h1>
      </div>
      <PaymentTable payments={payments} />
    </main>
  );
}

