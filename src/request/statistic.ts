import { request } from './request';

interface SaveStaticsParams {
  name?: string;
}

interface CountRes {
  allCount: number;
  todayCount: number;
}

export async function saveStatics(params?: SaveStaticsParams): PyPromise<null> {
  return await request('/api/statistic', params, 'POST');
}
export async function getStaticsCount(): PyPromise<CountRes> {
  return await request<CountRes>('/api/statistic', undefined, 'GET');
}
