import JsonParse from '@/page-components/json-parse';

export async function generateMetadata() {
  return {
    title: 'JSON解析',
    description: 'JSON解析',
  };
}

function Home() {
  return <JsonParse></JsonParse>;
}

export default Home;
