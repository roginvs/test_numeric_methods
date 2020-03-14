interface Value {
  value: number;
  p: number;
}

function randomValueByReverseFunc(values: Value[], r: number) {
  let threshold = 0;
  for (const { value, p } of values) {
    threshold += p;
    if (r <= threshold) {
      return value;
    }
  }

  console.warn(`Sum of probabilities is greater than 1`);
  return values.slice(-1)[0].value;
}
export function calculate(raw: string) {
  let msg = "";
  const addMsg = (s: string) => {
    console.info(s);
    msg += `${s}\n`;
  };

  const values: Value[] = [];
  const rows = raw
    .split(/\n/)
    .map(x => x.trim())
    .filter(x => x);
  const last = rows.pop();
  rows.forEach(rawLine => {
    const [value, p] = rawLine.split(" ").map(x => parseFloat(x));
    values.push({ value, p });
  });
  const [N, q] = last?.split(" ").map(x => parseInt(x));

  values.forEach(v => addMsg(`X=${v.value} p=${v.p}`));
  addMsg(`N=${N} q=${q}`);

  const exactMean = values.map(value => value.value * value.p).reduce((prev, cur) => prev + cur, 0);
  addMsg(`Точное среднее = ${exactMean}`);

  const exactD =
    values.map(value => value.value * value.value * value.p).reduce((prev, cur) => prev + cur, 0) -
    exactMean * exactMean;
  addMsg(`Точная дисперсия = ${exactD}`);

  const NValues = new Array(N).fill(0).map(() => randomValueByReverseFunc(values, Math.random()));
  const qValues = NValues.slice(0, q);
  qValues.forEach(v => addMsg(`Значение = ${v}`));

  const estimateMean = NValues.reduce((cur, acc) => cur + acc, 0) / N;
  addMsg(`Оценка среднего из N значений = ${estimateMean}`);

  const estimateD =
    NValues.map(x => x * x).reduce((cur, acc) => cur + acc, 0) / (N - 1) -
    (N * (estimateMean * estimateMean)) / (N - 1);
  addMsg(`Оценка дисперсии из N значений = ${estimateD}`);
  return msg;
}