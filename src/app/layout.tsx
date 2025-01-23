import { Geist, Geist_Mono } from 'next/font/google';

import Install from '@/components/render/install';
import NavBar from '@/components/render/nav-bar';
import { ConfigProvider } from 'antd';
import style from '@/style/antd.theme';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className='bg-white h-52 row-start-center px-md'>
          <div className='text-4xl font-bold'>JSON Parse</div>
          <div className='flex-1'></div>
          <NavBar></NavBar>
        </div>
        <ConfigProvider theme={style}>
          <div style={{ height: 'calc(100vh - 100px)' }} className='mt-md px-md'>
            <Install></Install>
            {children}
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}
