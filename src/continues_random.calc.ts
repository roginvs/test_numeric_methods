import { getEstimateMean, getEstimateD } from "./descrete_random.calc";

function randomValueByReverseFunc(G: (r: number) => number, r: number) {
  return G(r);
}

export function calculate() {
  let msg = "";
  const addMsg = (s: string) => {
    console.info(s);
    msg += `${s}\n`;
  };

  // # Проверка что интеграл равен 1
  //   Integrate[x ^ (1/3) / 12, {x, 0, 8}]
  // # График
  //   Plot[x ^ (1/3) / 12, {x, 0, 8}]
  addMsg("Функция f = x^(1/3) / 12 , 0 <= x <= 8");
  const N = 90;
  const q = 12;
  addMsg(`N=${N} q=${q}`);
  // Получаем F интегрируя f
  // Integrate[x ^ (1/3) / 12,x]
  // Plot[x^(4/3)/16, {x,0,8}]
  addMsg("F = x^(4/3) / 16");
  // И находим обратную функцию
  // Solve[x^(4/3)/16 == a, x]
  // 0 <= y <= 1
  addMsg("G = 8 * r^(3/4)");
  const G = (r: number) => 8 * r ** (3 / 4);

  // Точное среднее = интеграл от x*f
  // Integrate[ x * x ^ (1/3) / 12, {x, 0, 8}]
  const MExact = 32 / 7;
  addMsg(`Точное среднее = ${MExact}`);

  // Точная дисперсия
  // Integrate[ x * x * x ^ (1/3) / 12, {x, 0, 8}] - (32/7)^2
  const DExact = 1152 / 245;
  addMsg(`Точная дисперсия = ${DExact}`);

  const NValues = new Array(N).fill(0).map(() => randomValueByReverseFunc(G, Math.random()));
  const qValues = NValues.slice(0, q);
  addMsg(`Первые q значений = ${qValues.map(x => x.toPrecision(2)).join(", ")}`);

  const estimateMean = getEstimateMean(NValues, N);
  addMsg(`Оценка среднего из N значений = ${estimateMean}`);

  const estimateD = getEstimateD(NValues, estimateMean, N);
  addMsg(`Оценка дисперсии из N значений = ${estimateD}`);

  // Повторяем всё тоже самое, только много раз и смотрим на среднее
  const DEMO_LOOP_COUNT = 1000;
  const means: number[] = [];
  const Ds: number[] = [];
  for (let i = 0; i < DEMO_LOOP_COUNT; i++) {
    const demoValues = new Array(N).fill(0).map(() => randomValueByReverseFunc(G, Math.random()));
    const mean = getEstimateMean(demoValues, N);
    const D = getEstimateD(demoValues, mean, N);
    means.push(mean);
    Ds.push(D);
  }
  addMsg(`После ${DEMO_LOOP_COUNT} итераций:`);
  addMsg(`  Среднее по средним = ${getEstimateMean(means, DEMO_LOOP_COUNT)}`);
  addMsg(`  Среднее по дисперсии = ${getEstimateMean(Ds, DEMO_LOOP_COUNT)}`);

  return msg;
}
