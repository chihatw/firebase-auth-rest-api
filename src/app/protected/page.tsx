'use client';

import RippleButton from '@/components/RippleButton';
import { useRouter } from 'next/navigation';

const Protected = () => {
  const router = useRouter();
  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };
  return (
    <div className='container mx-auto flex justify-center px-5 pt-10'>
      <div className='grid w-96 gap-y-10'>
        <RippleButton label='logout' onClick={logout} />
      </div>
    </div>
  );
};

export default Protected;
