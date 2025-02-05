import { getStaticsCount, saveStatics } from '@/request/statistic';

const Statistic: React.FC = async () => {
  const staticRes = await getStaticsCount();
  saveStatics();
  return (
    <div className='ml-md'>
      <div className='row-start-center'>
        <div className='w-[84px] text-right'>今日访问量：</div>
        <div>{staticRes.success ? staticRes.data.todayCount : 0}</div>
      </div>
      <div className='row-start-center'>
        <div className='w-[84px] text-right'>总访问量：</div>
        <div>{staticRes.success ? staticRes.data.allCount : 0}</div>
      </div>
    </div>
  );
};

export default Statistic;
