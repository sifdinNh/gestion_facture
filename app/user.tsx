import { Button } from '@/components/ui/button';
import Image from 'next/image';

export async function User() {
  const user = null;

  if (!user) {
    return (
      <form
      >
        <Button variant="outline">Sign In</Button>
      </form>
    );
  }
}