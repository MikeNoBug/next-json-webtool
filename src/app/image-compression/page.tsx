import ImageCompression from '@/page-components/image-compression';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  return {
    title: '图片压缩',
    description: '在线图片压缩',
  };
}

const Page = () => {
  return <ImageCompression />;
};

export default Page;
