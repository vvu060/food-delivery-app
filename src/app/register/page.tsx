'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setCreatingUser(false);
      setUserCreated(true);
      setEmail('');
      setPassword('');
    } else {
      setCreatingUser(false);
      setError(true);
    }
  };

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>Register</h1>
      {userCreated && (
        <div className='my-4 text-center'>
          User Created <br /> Now you can{' '}
          <Link href='/login' className='underline'>
            login &raquo;
          </Link>{' '}
        </div>
      )}
      {error && (
        <div className='my-4 text-center'>
          An error occurred <br /> Please try again later
        </div>
      )}
      <form className='block max-w-xs mx-auto' onSubmit={handleFormSubmit}>
        <input
          type='email'
          value={email}
          disabled={creatingUser}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email'
        />
        <input
          type='password'
          value={password}
          disabled={creatingUser}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
        />
        <button type='submit' disabled={creatingUser}>
          Register
        </button>
        <div className='my-4 text-center text-gray-500'>
          or login with provider
        </div>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className='flex items-center gap-4 justify-center'
        >
          <Image src='/google.png' alt='google' width='24' height='24' />
          Login with google
        </button>
        <div className='text-center my-4 text-gray-500 border-t pt-4'>
          Existing user?{' '}
          <Link className='underline' href='/login'>
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
