import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';
import { Logo, SettingsIcon, UsersIcon, PaymentIcon, InvoiceIcon } from '@/components/icons';
import { User } from './user';
import { NavItem } from './nav-item';
import { authenticate } from '@/queries/server/auth'
import { redirect } from 'next/navigation'


export const metadata = {
  title: 'IMACID',
  description:
    ''
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { user: session } = await authenticate()
  if (!session) redirect('/auth/sign-in')

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body>
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-[60px] items-center border-b px-5">
                <Link
                  className="flex items-center gap-2 font-semibold"
                  href="/dashboard/users"
                >
                  <Logo />
                  <span className="">IMACID</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <NavItem href="/dashboard/users">
                    <UsersIcon className="h-4 w-4" />
                    Users
                  </NavItem>
                  <NavItem href="/dashboard/factures">
                    <InvoiceIcon className="h-4 w-4" />
                    Factures
                  </NavItem>
                  <NavItem href="/dashboard/archive-factures">
                    <InvoiceIcon className="h-4 w-4" />
                    Archived
                  </NavItem>
                  <NavItem href="/dashboard/payments">
                    <PaymentIcon className="h-4 w-4" />
                    Payments
                  </NavItem>

                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
              <Link
                className="flex items-center gap-2 font-semibold lg:hidden"
                href="/"
              >
                <Logo />
                <span className="">ACME</span>
              </Link>
              <User />
            </header>
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}