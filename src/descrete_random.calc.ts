interface Value {
  value: number;
  p: number;
}
export function calculate(raw: string) {
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

  console.info(values, N, q);
  return "kekekek";
}
