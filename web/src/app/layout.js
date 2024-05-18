'use client';

import { useEffect, useState } from 'react';
import '@/app/globals.css';
import { NearContext } from '@/context';
import { Navigation } from '@/components/navigation';
import { NetworkId, ArticleContract } from '@/config';
import { Open_Sans } from 'next/font/google';

import { Wallet } from '@/wallets/near';

const wallet = new Wallet({ networkId: NetworkId, createAccessKeyFor: ArticleContract });

const openSans = Open_Sans({
  subsets: ['latin'],
})

// Layout Component
export default function RootLayout({ children }) {
  const [signedAccountId, setSignedAccountId] = useState('');

  useEffect(() => { wallet.startUp(setSignedAccountId); }, []);

  return (
    <html lang="en">
      <body className={openSans.className}>
        <NearContext.Provider value={{ wallet, signedAccountId }}>
          <Navigation />
          {children}
        </NearContext.Provider>
      </body>
    </html>
  );
}
