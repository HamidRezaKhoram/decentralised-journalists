import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';

import { NearContext } from '@/context';

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout`);
    } else {
      setAction(() => wallet.signIn);
      setLabel('Login');
    }
  }, [signedAccountId, wallet]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="flex flex-row justify-between w-full">
        <Link href="/" className='hover:cursor-pointer w-full mt-2.5'>
          <Image priority src={`/logo.png`} alt="Decentralised Journalists Logo" width="600" height="600" className="w-[22%] md:w-[6%] d-inline-block align-text-top" />
        </Link>

        <div className='navbar-nav p-2'>
          <button className="bg-gray-950 rounded-md text-white h-1/2 py-4 my-auto flex justify-center items-center px-4" onClick={action} > {label} <p className={`${signedAccountId ? '' : `hidden md:hidden`} hidden md:inline-block`}>&nbsp;({signedAccountId})</p> </button>
        </div>
      </div>
    </nav>
  );
};