import TimeCounter from '@/page-components/time-counter';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  return {
    title: '时间解析',
    description: '时间计算，在线时间计算器',
  };
}

const Page = () => {
  return <TimeCounter></TimeCounter>;
};

export default Page;
