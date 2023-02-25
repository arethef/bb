// UTC to KST (UTC+9시간)
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
export const generateYYYYMMDD = () => {
  const date = getKST();
  return `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
};

export const getKST = () => {
  const curr = new Date();
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  return new Date(utc + KR_TIME_DIFF);
};

export const countNumberOfDay = {
  product: 0,
};

export const generateProductDayNumber = function* () {
  let count = 0;
  let lastDateTime = getKST();
  while (true) {
    if (lastDateTime.getDate() - getKST().getDate() > 1) {
      count = 0;
      lastDateTime = getKST();
    }
    yield count++;
  }
};
export const generateMarketDayNumber = function* () {
  let count = 0;
  let lastDateTime = getKST();
  while (true) {
    if (lastDateTime.getDate() - getKST().getDate() > 1) {
      count = 0;
      lastDateTime = getKST();
    }
    yield count++;
  }
};
