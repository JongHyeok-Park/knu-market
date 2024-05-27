import { getCookie } from '../utils/cookieManage';
// 알림 조회
const getAlarmApi = async () => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/alarm', {
    headers: {
      'authorization': 'Bearer ' + getCookie('accessToken')
    }
  });

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.json();
}

const deleteAlarmApi = async (id) => {
  let res = await fetch(process.env.REACT_APP_API_URL + '/api/alarm/' + id, {
    method: 'DELETE',
    headers: {
      'authorization': 'Bearer ' + getCookie('accessToken')
    }
  });

  if (!res.ok) {
    let message = await res.text();
    throw new Error(message);
  }

  return res.text();
}

export { getAlarmApi, deleteAlarmApi };