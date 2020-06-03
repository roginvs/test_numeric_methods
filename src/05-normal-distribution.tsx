import React, { useState, useEffect } from "react";
import { BaseUi } from "./03-base-ui";
import { getEstimateD, getEstimateMean } from "./descrete_random.calc";

export const nbsp = "\u00A0";
function calculate() {
  let msg = "";

  /*
  for (const [a, b] of [
    [0, 1],
    //[1, 2],
    // [5, 8],
    [10, 20],
  ]) {
    msg += `a=${a} b=${b}\n`;

    const M_each = (b - a) / 2 + a;
    const D_each = (b - a) ** 2 / 12;
    msg += `Точные значения для промежуточной случайной величины M=${M_each} D=${D_each}\n`;

    for (const sum_n of [12, 10000]) {
      msg += `Суммируем N=${sum_n} раз\n`;
      const M = sum_n * M_each;
      const D = D_each * sum_n;
      msg += `  Точные значения M=${M} D=${D}\n`;

      for (const n of [50, 500, 5000]) {
        const selection: number[] = [];
        for (let i = 0; i < n; i++) {
          let sum_value = 0;
          for (let ii = 0; ii < sum_n; ii++) {
            const rand = Math.random();
            const val = a + rand * (b - a);
            sum_value += val;
          }
          const val = sum_value;
          selection.push(val);
        }

        const estimateMean = getEstimateMean(selection, n);
        const estimateD = getEstimateD(selection, estimateMean, n);
        msg += `  На выборке из n=${n} элементов M=${estimateMean} D=${estimateD}\n`;

        msg += `    Погрешность M=${estimateMean - M}\n`;
        msg += `    Погрешность D=${estimateD - D}\n`;
      }
    }
    msg += `${nbsp}\n`;
  }

  msg += `${nbsp}\n`;
  msg += `${nbsp}\n`;
  */

  for (const [a, b] of [
    [3, 9],
    [10, 20],
  ]) {
    msg += `a=${a} b=${b}\n`;
    const M_each = (b - a) / 2 + a;
    const D_each = (b - a) ** 2 / 12;
    msg += `Точные значения для промежуточной случайной величины M=${M_each} D=${D_each}\n`;

    for (const sum_n of [12, 10000]) {
      msg += `Моделируем нормальн распределенную случайною величину суммируя N=${sum_n} раз\n`;

      for (const n of [50, 500, 5000]) {
        const selection: number[] = [];
        for (let i = 0; i < n; i++) {
          let sum_value = 0;
          for (let ii = 0; ii < sum_n; ii++) {
            const rand = Math.random();
            const val_intermidiate = a + rand * (b - a);
            sum_value += val_intermidiate;
          }
          const val = (sum_value - sum_n * M_each) / (Math.sqrt(D_each) * Math.sqrt(sum_n));
          selection.push(val);
        }

        const estimateMean = getEstimateMean(selection, n);
        const estimateD = getEstimateD(selection, estimateMean, n);
        msg += `  На выборке из n=${n} элементов M=${estimateMean} D=${estimateD}\n`;
      }
    }
    msg += `${nbsp}\n`;
  }

  return msg;
}

export const NormalDistribution = () => (
  <BaseUi calculate={calculate} name="Моделирование нормального распределения N(0,1)" />
);
