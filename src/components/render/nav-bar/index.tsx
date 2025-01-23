'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navList = [
  {
    name: 'JSON解析',
    path: '/',
  },
  {
    name: '时间计算',
    path: '/time-counter',
  },
  {
    name: '图片压缩',
    path: '/image-compression',
  },
];

const NavBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className='row-start-center'>
      {navList.map((item) => {
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`h-40 row-start-center hover:text-primary mr-lg cursor-pointer ${pathname === item.path ? 'text-primary border-b border-t-0 border-l-0 border-r-0 border-primary border-solid' : ''}`}>
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavBar;
