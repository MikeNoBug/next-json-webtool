'use client';
import { getStaticsCount, saveStatics } from '@/request/statistic';
import { useMount } from 'ahooks';
import { useState } from 'react';

const Statistic: React.FC = () => {
  const [dayilyCount, setDailyCount] = useState(0);
  const [allCount, setAllCount] = useState(0);
  useMount(async () => {
    saveStatics();
    const res = await getStaticsCount();
    if (!res.success) {
      return;
    }
    setAllCount(res.data.allCount);
    setDailyCount(res.data.todayCount);
  });
  return (
    <div className='ml-md'>
      <div className='row-start-center'>
        <div className='w-[84px] text-right'>今日访问量：</div>
        <div>{dayilyCount}</div>
      </div>
      <div className='row-start-center'>
        <div className='w-[84px] text-right'>总访问量：</div>
        <div>{allCount}</div>
      </div>
    </div>
  );
};

export default Statistic;
