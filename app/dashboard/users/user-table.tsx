"use client";

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
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useUsersAPI, useDeleteUser } from '@/queries/client/users';
import { User } from '@/types/database'


export function UsersTable({
  offset
}: {
  offset: number | null;
}) {
  const router = useRouter();
  const { deleteUser, isLoading, error } = useDeleteUser();


  function onClick() {
    router.replace(`/?offset=${offset}`);
  }
  const [page, setPage] = React.useState<number>(1)
  const [perPage, setPerPage] = React.useState<number>(50)

  const { user } = useAuth()
  const { users } = useUsersAPI(user?.id ?? null, { page, perPage })
  
  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">id</TableHead>
              <TableHead className="max-w-[150px]">nom</TableHead>
              <TableHead className="max-w-[150px]">prenom</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">role</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user : User) => (
              <UserRow key={user?.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
        Suivant
        </Button>
      )}
    </>
  );
}

const Badge = ({ text }) => {
    return (
        <div  className={clsx(
            "text-sm font-bold text-center px-3 rounded-full w-max",
            {
                "bg-indigo-200 text-indigo-800" : text == 'Comptable',
                "bg-blue-200 text-blue-800" : text == "Financier"
            }
        )}>{text}</div>
    );
};
  
function UserRow({ user }: { user: User }) {
  const userId = user.id;
  const { deleteUser, isLoading, error } = useDeleteUser();

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      alert('User deleted successfully!');
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{user.id}</TableCell>
      <TableCell className="font-medium">{user.user_metadata?.first_name}</TableCell>
      <TableCell className="font-medium">{user.user_metadata?.last_name}</TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell>< Badge text={user.user_metadata?.role} /></TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          onClick={handleDelete}
          disabled={isLoading}
        >
          Supprimer
        </Button>
      </TableCell>
      {error && <TableCell><p className="text-red-500">{error.message}</p></TableCell>}
    </TableRow>
  );
}