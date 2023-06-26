export const getTimegap = (date: number) => {
  const msgap = Math.floor(Date.now() / 1000 - date / 1000);
  const minutegap = Math.floor(msgap / 60);
  const hourgap = Math.floor(minutegap / 24);
  const postDate = new Date(date);

  if (msgap < 60) {
    return `${msgap}초 전`;
  }
  if (hourgap > 24) {
    return `${postDate.getFullYear()}년 ${postDate.getMonth() + 1}월 ${postDate.getDate()}일`;
  }
  if (minutegap > 60) {
    return `${hourgap}시간 전`;
  } else {
    return `${minutegap}분 전`;
  }
};
