'use client';

import Icon from '@/components/render/icon';
import { format } from '@/util/dateUtil';
import { useMemoizedFn, useMount, useUnmount } from 'ahooks';
import { Button, Input, Popover, Table } from 'antd';
import { useRef, useState } from 'react';

interface DescItem {
  value: string;
  demo: string;
  desc: string;
}

const descItems: DescItem[] = [
  {
    value: 'YY',
    demo: '22',
    desc: '两位数的年份',
  },
  {
    value: 'YYYY',
    demo: '2022',
    desc: '四位数的年份',
  },
  {
    value: 'M',
    demo: '1-12',
    desc: '月份，不足两位没有占位0',
  },
  {
    value: 'MM',
    demo: '01-12',
    desc: '月份，不足两位占位0',
  },
  {
    value: 'MMM',
    demo: 'Jan-Dec',
    desc: '月份英语缩写',
  },
  {
    value: 'MMMM',
    demo: 'January-December',
    desc: '月份英语全拼',
  },
  {
    value: 'D',
    demo: '1-31',
    desc: '月份里的一天',
  },
  {
    value: 'DD',
    demo: '01-31',
    desc: '月份里的一天，不足两位占位0',
  },
  {
    value: 'H',
    demo: '0-23',
    desc: '小时，不足两位没有占位0',
  },
  {
    value: 'HH',
    demo: '00-23',
    desc: '小时，不足两位占位0',
  },
  {
    value: 'h',
    demo: '1-12',
    desc: '小时，不足两位没有占位0',
  },
  {
    value: 'hh',
    demo: '01-12',
    desc: '小时，不足两位占位0',
  },
  {
    value: 'm',
    demo: '0-59',
    desc: '分钟数，不足两位没有占位0',
  },
  {
    value: 'mm',
    demo: '00-59',
    desc: '分钟数，不足两位占位0',
  },
  {
    value: 's',
    demo: '0-59',
    desc: '秒，不足两位没有占位0',
  },
  {
    value: 'ss',
    demo: '00-59',
    desc: '秒，不足两位占位0',
  },
];

const TimeStampToStr: React.FC = () => {
  const [now, setNow] = useState<Date | null>(null);
  const [stampStr, setStampStr] = useState<string>('');
  const [formatStr, setFormatStr] = useState<string>('YYYY-MM-DD HH:mm:ss');
  const [result, setResult] = useState<string>('');

  const intervalRef = useRef<number>(0);

  useMount(() => {
    if (typeof window === 'undefined') {
      return;
    }
    setNow(new Date());
    intervalRef.current = window.setInterval(() => {
      if (typeof window === 'undefined') {
        return;
      }
      setNow(new Date());
    }, 1000);
  });

  useUnmount(() => {
    clearInterval(intervalRef.current);
  });

  const handleFormat = useMemoizedFn(() => {
    if (!stampStr) {
      setResult('');
      return;
    }
    const inputStampStr = parseFloat(stampStr);
    if (isNaN(inputStampStr)) {
      window.$error('请输入一个数字作为时间戳');
      setResult('');
      return '';
    }
    setResult(format(inputStampStr, formatStr));
  });

  return (
    <div className='p-lg'>
      <h1>时间戳转时间字符串</h1>
      <div className='mt-md text-xl'>
        <span>现在时间：{now && now.getTime()}</span>
        <span className='ml-md'>{now ? format(now) : null}</span>
      </div>
      <div className='row-start-center mt-md'>
        <Input placeholder='请输入时间戳' value={stampStr} onChange={(e) => setStampStr(e.target.value)} className='w-[220px]' size='large'></Input>
        <Input placeholder='请输入格式化' value={formatStr} onChange={(e) => setFormatStr(e.target.value)} className='w-[220px] !ml-md' size='large'></Input>
        <Popover
          placement='right'
          content={
            <Table<DescItem>
              sticky={true}
              scroll={{ y: 500 }}
              bordered={true}
              pagination={false}
              className='w-[500px]'
              dataSource={descItems}
              rowKey={'value'}
              columns={[
                {
                  align: 'left',
                  dataIndex: 'value',
                  title: '输入',
                },
                {
                  align: 'left',
                  dataIndex: 'demo',
                  title: '示例',
                },
                {
                  align: 'left',
                  dataIndex: 'desc',
                  title: '描述',
                },
              ]}></Table>
          }
          className='ml-md'>
          <Icon type='question' className='text-warning text-xl'></Icon>
        </Popover>
        <Button type='primary' size='large' className='mx-md' onClick={handleFormat}>
          转换
        </Button>
        <Input value={result} placeholder='转换结果' className='w-[220px]' size='large'></Input>
      </div>
    </div>
  );
};

export default TimeStampToStr;
