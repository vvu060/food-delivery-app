'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { status, data } = useSession();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(data?.user?.name || '');
    }
  }, [status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // if (status === 'unauthenticated') {
  //   return redirect('/login');
  // }

  const userImage = data?.user?.image;

  const handleProfileInfoUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userName }),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile Saved!',
      error: 'Error saving.',
    });
  };

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>Profile</h1>

      <div className='max-w-md mx-auto'>
        <div className='flex gap-2 items-center'>
          {userImage && (
            <div className='p-2 rounded-md relative'>
              <Image
                src={userImage}
                alt='avatar'
                height={250}
                width={250}
                className='rounded-md w-full h-full mb-1'
              />
            </div>
          )}
          <form className='grow' onSubmit={handleProfileInfoUpdate}>
            <input
              type='text'
              value={userName || ''}
              onChange={(e) => setUserName(e.target.value)}
              className='capitalize'
            />
            <input type='email' value={data?.user?.email || ''} disabled />
            <button type='submit'>Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
