import JsonParse from '@/page-components/json-parse';

export async function generateMetadata() {
  return {
    title: 'JSON在线解析',
    description: 'JSON在线解析，解析结果清晰明了，简单易用，JSON格式化校验，快速定位json字符串错误位置，帮助修正json字符串格式。文本实用工具，非常简单实用',
  };
}

function Home() {
  return <JsonParse></JsonParse>;
}

export default Home;
