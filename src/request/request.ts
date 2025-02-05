import axios from 'axios';

axios.defaults.timeout = 60000;
axios.defaults.baseURL = 'https://jsonwebtool.com/api';

export async function request<T>(url = '', params = {}, type = 'POST'): PyPromise<T> {
  try {
    const res = await axios({
      url,
      params,
      method: type,
    });
    if (res.status === 200) {
      return {
        success: true,
        data: res.data.data,
      };
    }
    return {
      success: false,
      msg: JSON.stringify(res),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    if (error.code === 'ERR_BAD_REQUEST') {
      return {
        success: false,
        msg: error.message,
      };
    }
    return {
      success: false,
      msg: error.toString(),
    };
  }
}
