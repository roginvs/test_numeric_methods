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
    f: x => x * Math.sqrt(x + 1),
    max4d: 1.5,
    a: 0,
    b: 1,
  },

  {
    name: "e^(ax) * sin (bx)",
    f: x => Math.exp(0.73 * x) * Math.sin(1.46 * x),
    // D[Exp[a * x] * Sin[b * x], {x, 4}]
    // Plot[Evaluate[D[Exp[a * x] * Sin[b * x], {x, 4}]], {x, 1, 2}]
    // Integrate[Exp[0.73 * x] * Sin[1.46 * x] , {x, 1, 2}]
    max4d: 25,
    a: 1,
    b: 2,
  },

  {
    name: "1 / sqrt(x*2 + a)",
    f: x => 1 / Math.sqrt(x * x + 0.72),
    // D[ 1 / Sqrt[x*x + 0.72], {x, 4}]
    // Plot[Evaluate[D[ 1 / Sqrt[x*x + 0.72], {x, 4}]], {x, 1, 2}]
    // Integrate[ 1 / Sqrt[x*x + 0.72] , {x, 1, 2}]
    max4d: 1,
    a: 1,
    b: 2,
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
