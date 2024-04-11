export function dateFormatter(value: string) {
  const date = new Date(value);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return formattedDate;
}

export function countLanguages(array: string[]) {
  const result = array.reduce((accum: { [key: string]: number }, elem) => {
    if (accum[elem]) {
      accum[elem] += 1;
    } else {
      accum[elem] = 1;
    }
    return accum;
  }, {});
  for (const lang in result) {
    result[lang] = Math.round((result[lang] / array.length) * 100);
  }
  return result;
}
