'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { status, data } = useSession();
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(data?.user?.name || '');
      fetch('/api/profile')
        .then((res) => res.json())
        .then((data) => {
          setPhone(data.phone || '');
          setStreetAddress(data.streetAddress || '');
          setPostalCode(data.postalCode || '');
          setCity(data.city || '');
          setCountry(data.country || '');
        })
        .catch((err) => console.error('Error fetching profile data', err));
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
        body: JSON.stringify({
          name: userName,
          phone,
          streetAddress,
          postalCode,
          city,
          country,
        }),
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
        <div className='flex gap-2 items-start'>
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
          <form className='grow space-y-3' onSubmit={handleProfileInfoUpdate}>
            <input
              type='text'
              placeholder='John Doe'
              value={userName || ''}
              onChange={(e) => setUserName(e.target.value)}
              className='capitalize'
            />
            <input
              type='email'
              placeholder='john.doe@example.com'
              value={data?.user?.email || ''}
              disabled
            />
            <input
              type='tel'
              placeholder='Phone Number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type='text'
              placeholder='Street Address'
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <div className='flex gap-x-4'>
              <input
                type='text'
                placeholder='Postal Code'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <input
                type='text'
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <input
              type='text'
              placeholder='Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button type='submit'>Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
