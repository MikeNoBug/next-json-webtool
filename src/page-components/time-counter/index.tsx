'use client';

import { useMount } from 'ahooks';
import TimeStampToStr from './time-stamp-to-str';
import StrToStamp from './str-to-stamp';

const TimeCounter: React.FC = () => {
  useMount(() => {
    document.title = '时间计算';
  });
  return (
    <div className='bg-white mx-auto my-0 h-full w-[1000px]'>
      <TimeStampToStr></TimeStampToStr>
      <StrToStamp></StrToStamp>
    </div>
  );
};

export default TimeCounter;
