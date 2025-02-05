import { request } from './request';

interface SaveStaticsParams {
  name?: string;
}

interface CountRes {
  allCount: number;
  todayCount: number;
}

export async function saveStatics(params?: SaveStaticsParams): PyPromise<null> {
  return await request('/statistic/save', params, 'GET');
}
export async function getStaticsCount(): PyPromise<CountRes> {
  return await request<CountRes>('/statistic/getCount', undefined, 'GET');
}
