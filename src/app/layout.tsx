import Install from '@/components/render/install';
import NavBar from '@/components/render/nav-bar';
import { ConfigProvider } from 'antd';
import style from '@/style/antd.theme';
import './globals.css';
import Statistic from '@/components/service/statistic';
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body style={{ background: '#f5f5f5' }} className='col-start-start w-full'>
        <div className='bg-white h-52 row-start-center px-md w-full'>
          <div className='text-4xl font-bold'>JSON Parse</div>
          <Statistic></Statistic>
          <div className='flex-1'></div>
          <NavBar></NavBar>
        </div>
        <ConfigProvider theme={style}>
          <div style={{ height: 'calc(100vh - 100px)' }} className='mt-md px-md w-full'>
            <Install></Install>
            {children}
          </div>
        </ConfigProvider>
        <div className='row-center-center flex-1 w-full'>
          <a href='https://beian.miit.gov.cn/'>鲁ICP备2022012473号-1</a>
        </div>
      </body>
    </html>
  );
}
