export function calculate(a: number, b: number, c: number, epsilon: number) {
  let msg = "";
  const addMsg = (s: string) => {
    console.info(s);
    msg += `${s}\n`;
  };

  for (const l of [
    {
      name: "e^(ax) * sin (bx)",
      f: (x: number) => Math.exp(a * x) * Math.sin(b * x),
      // D[Exp[a * x] * Sin[b * x], {x, 4}]
      max4d: () => 2,
    },
  ]) {
    addMsg(`Считаем функцию ${l.name}`);
  }

  return msg;
}
