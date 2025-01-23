'use client';
import { getTimeStamp } from '@/util/dateUtil';
import { useMemoizedFn } from 'ahooks';
import { Button, Input } from 'antd';
import { useState } from 'react';

const StrToStamp: React.FC = () => {
  const [inputStr, setInputStr] = useState<string>('');
  const [result, setResult] = useState('');
  const handleTransform = useMemoizedFn(() => {
    if (!inputStr) {
      window.$error('请输入一个时间字符串');
      return;
    }
    setResult(getTimeStamp(inputStr) + '');
  });
  return (
    <div className='p-lg'>
      <h1>字符串转时间戳</h1>
      <div className='mt-md'>
        <Input
          placeholder='请输入时间字符串'
          value={inputStr}
          className='w-[220px]'
          size='large'
          onChange={(e) => {
            setInputStr(e.target.value);
          }}></Input>
        <Button size='large' type='primary' className='mx-md' onClick={handleTransform}>
          转换
        </Button>
        <Input placeholder='转换结果' value={result} className='w-[220px]' size='large' />
      </div>
    </div>
  );
};

export default StrToStamp;
