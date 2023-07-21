'use client';
import { auth } from '@/lib/firebase-config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();

  const [value, setValue] = useState({ email: '', password: '' });

  function signIn() {
    signInWithEmailAndPassword(auth, value.email, value.password).then(
      async (userCred) => {
        fetch('/api/login', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await userCred.user.getIdToken()}`,
          },
        }).then((response) => {
          if (response.status === 200) {
            router.push('/protected');
          }
        });
      }
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-100'>
      <div className='grid w-96 gap-y-8'>
        <input
          type='email'
          className='w-full rounded'
          placeholder='email'
          onChange={(e) =>
            setValue((currentValue) => ({
              ...currentValue,
              email: e.target.value,
            }))
          }
        />
        <input
          type='password'
          className='w-full rounded'
          placeholder='password'
          onChange={(e) =>
            setValue((currentValue) => ({
              ...currentValue,
              password: e.target.value,
            }))
          }
        />
        <button
          disabled={!value.email || !value.password}
          className='rounded bg-sky-500 p-2 text-white hover:bg-sky-700 disabled:bg-gray-300'
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
