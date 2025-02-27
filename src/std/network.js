export const makeGetJsonDiiaCell = (diia, context) => diia.tools.asyncFn(async ([url]) => {
  const response = await fetch(url, {
    method: "get",
    headers: {
      "Accept": "application/json"
    }
  });
  const result = await response.json();

  return result;
});
