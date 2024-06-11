import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { authenticate } from '@/queries/server/auth'
import { SignOutButton } from './signout'

export async function User() {
  const { user: session } = await authenticate()
  if (!session) {
    return (
      <Link href={'/auth/sign-in'}><Button variant="outline">Sign In</Button></Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <form
      >
        <SignOutButton />
      </form>
      <img
        className="h-8 w-8 rounded-full"
        src={'https://static.vecteezy.com/system/resources/previews/011/459/666/original/people-avatar-icon-png.png'}
        height={32}
        width={32}
        alt={`${session} avatar`}
      />
    </div>
  )
}