const formatDate = (upload) => {
  const today = new Date();
  const uploadedDate = new Date(upload);
  let timeGap = today.getTime() - uploadedDate.getTime();

  if (timeGap < 0) {
    timeGap = 0;
  }

  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 31;
  const year = day * 365;
  
  let date;
  if (timeGap < (10 * sec)) {
    date = '방금'
  } else if (timeGap < min) {
    date = timeGap / sec;
    date = date.toFixed(0);
    date = date + '초';
  } else if (timeGap < hour) {
    date = timeGap / min; 
    date = date.toFixed(0);
    date = date + '분';
  } else if (timeGap < day) {
    date = timeGap / hour;
    date = date.toFixed(0);
    date = date + '시간';
  } else if (timeGap < week) {
    date = timeGap / day;
    date = date.toFixed(0);
    date = date + '일';
  } else if (timeGap < month) {
    date = timeGap / week;
    date = date.toFixed(0)
    date = date + '주';
  } else if (timeGap < year) {
    date = timeGap / month;
    date = date.toFixed(0)
    date = date + '달';
  } else {
    date = timeGap / year;
    date = date.toFixed(0);
    date = date + '년';
  }

  return date;
}

export default formatDate;