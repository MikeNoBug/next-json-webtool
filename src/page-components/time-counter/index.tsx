'use client';

import TimeStampToStr from './time-stamp-to-str';
import StrToStamp from './str-to-stamp';

const TimeCounter: React.FC = () => {
  return (
    <div className='bg-white mx-auto my-0 h-full w-[1000px]'>
      <TimeStampToStr></TimeStampToStr>
      <StrToStamp></StrToStamp>
    </div>
  );
};

export default TimeCounter;
