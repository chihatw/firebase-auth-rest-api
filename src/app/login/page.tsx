'use client';
// https://nextjs.org/docs/app/api-reference/functions/use-router
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [value, setValue] = useState({ email: '', password: '' });
  const signIn = async () => {
    const body = JSON.stringify(value);
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    if (response.status === 200) {
      router.push('/protected');
    } else {
      const error = await response.json();
      switch (error.message) {
        case 'INVALID_EMAIL':
        case 'EMAIL_NOT_FOUND':
          console.log('メールアドレスが間違っています');
          break;
        case 'INVALID_PASSWORD':
          console.log('パスワードが間違っています');
          break;
        default:
          console.log(error.message);
      }
    }
  };

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
