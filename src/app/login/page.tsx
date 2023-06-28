'use client';
import { auth } from '@/lib/firebase-config';
import {
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from '@firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignIn() {
  const router = useRouter();

  const [value, setValue] = useState({ email: '', password: '' });

  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) {
        return;
      }

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
    });
  }, [router]);

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
    <div className='container mx-auto bg-slate-100 min-h-screen flex justify-center items-center'>
      <div className='grid gap-y-8 w-96'>
        <div className='w-full'>
          <input
            type='email'
            className='rounded w-full'
            placeholder='email'
            onChange={(e) =>
              setValue((currentValue) => ({
                ...currentValue,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div className='w-full'>
          <input
            type='password'
            className='rounded w-full'
            placeholder='password'
            onChange={(e) =>
              setValue((currentValue) => ({
                ...currentValue,
                password: e.target.value,
              }))
            }
          />
        </div>
        <button
          className='bg-sky-500 p-2 rounded text-white'
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
