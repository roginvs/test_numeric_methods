interface Func {
  a: number;
  b: number;
  f: (x: number) => number;
  name: string;
  max4d: number;
}

const FUNCS: Func[] = [
  {
    name: "x*sqrt(x+1)",
    f: (x: number) => x * Math.sqrt(x + 1),
    max4d: 1.5,
    a: 0,
    b: 1,
  },
];

export function calculate(epsilon: number) {
  let msg = "";
  const addMsg = (s: string) => {
    console.info(s);
    msg += `${s}\n`;
  };

  for (const l of FUNCS) {
    const { f, a, b } = l;

    addMsg(`Считаем интеграл функции ${l.name} на [${a}, ${b}]`);
    const M = l.max4d;

    addMsg(`M = ${M}`);

    const nFractial = Math.pow((M * Math.pow(b - a, 5)) / (180 * epsilon), 1 / 4);
    const nCeil = Math.ceil(nFractial);
    const n = nCeil % 2 === 0 ? nCeil : nCeil + 1;
    addMsg(`n = ${n}`);

    const h = (b - a) / n;
    addMsg(`h = ${h}`);

    let s = (f(a) - f(b)) / 2;
    for (let i = 1; i <= n / 2; i++) {
      const x = a + 2 * i * h;
      s = s + f(x) + 2 * f(x - h);
    }
    s = (s * 2 * h) / 3;
    addMsg(`Интеграл = ${s}`);
    addMsg("");
  }

  return msg;
}
