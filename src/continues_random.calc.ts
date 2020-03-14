export function calculate() {
  let msg = "";
  const addMsg = (s: string) => {
    console.info(s);
    msg += `${s}\n`;
  };

  // # Проверка что интеграл равен 1
  // Integrate[x ^ (1/3) / 12, {x, 0, 8}]
  addMsg("Функция f = x^(1/3) / 12 , 0 <= x <= 8");
  const N = 90;
  const q = 12;
  addMsg(`N=${N} q=${q}`);
  // Integrate[x ^ (1/3) / 12,x]
  // Plot[x^(4/3)/16, {x,0,8}]
  addMsg("F = x^(4/3) / 16");
  // Solve[x^(4/3)/16 == a, x]
  // 0 <= y <= 1
  addMsg("G = 8 * y^(3/4)");

  // Integrate[ x * x ^ (1/3) / 12, {x, 0, 8}]
  const M = 32 / 7;
  addMsg(`Точное среднее = ${M}`);

  // Integrate[ x * x * x ^ (1/3) / 12, {x, 0, 8}] - 32/7
  const D = 736 / 35;
  addMsg(`Точная дисперсия = ${D}`);
  return msg;
}
