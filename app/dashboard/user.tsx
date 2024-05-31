import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function User() {
  const user = null;

  if (!user) {
    return (
      <Link href={'/auth/sign-in'}><Button variant="outline">Sign In</Button></Link>
    );
  }
}