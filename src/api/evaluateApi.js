import { getCookie } from "../utils/cookieManage"

const postEvaluate = async (id, score) => {
  let res = await fetch(process.env.REACT_APP_API_URL + `/api/evaluation?alarmId=${id}&evaluationScore=${score}`, {
    method: 'POST',
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

export { postEvaluate };