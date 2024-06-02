import { UsersTable } from './user-table';
import { users } from '../../constatns'
import AddUserDialog  from './add-user-dialog';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const offset = 1;
  
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
      </div>
      <AddUserDialog />
      <UsersTable users={users} offset={offset} />
    </main>
  );
}

