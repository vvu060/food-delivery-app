'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { use } from 'react';

const Header = () => {
  const { status, data } = useSession();
  let username = data?.user?.name || data?.user?.email;

  if (username?.includes(' ')) {
    username = username?.split(' ')[0];
  }

  return (
    <header className='flex items-center justify-between'>
      <nav className='flex items-center gap-8 text-gray-500 font-semibold'>
        <Link className='text-primary font-semibold text-2xl' href='/'>
          ST PIZZA
        </Link>
        <Link href='/'>Home</Link>
        <Link href=''>Menu</Link>
        <Link href=''>About</Link>
        <Link href=''>Contact</Link>
      </nav>
      <nav className='flex items-center gap-4 text-gray-500 font-semibold'>
        {status === 'authenticated' && (
          <>
            <Link className='capitalize whitespace-nowrap' href='/profile'>
              Hello, {username}
            </Link>
            <button
              onClick={() => signOut()}
              className='bg-primary text-white px-6 py-2 rounded-lg'
            >
              Logout
            </button>
          </>
        )}

        {status === 'unauthenticated' && (
          <>
            <Link href='/login'>Login</Link>
            <Link
              href='/register'
              className='bg-primary text-white px-6 py-2 rounded-lg'
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
