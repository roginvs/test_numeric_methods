import React, { useState, useEffect } from "react";
import { BaseUi } from "./03-base-ui";
import { getEstimateD, getEstimateMean } from "./descrete_random.calc";

export const nbsp = "\u00A0";
function calculate() {
  let msg = "";

  const n = 50;
  for (const [a, b] of [
    [1, 2],
    [5, 8],
    [10, 20],
  ]) {
    msg += `a=${a} b=${b}\n`;
    const selection: number[] = [];
    for (let i = 0; i < n; i++) {
      const r = Math.random();
      const val = a + r * (b - a);
      selection.push(val);
    }
    const estimateMean = getEstimateMean(selection, n);
    const estimateD = getEstimateD(selection, estimateMean, n);
    msg += `На выборке из n=${n} элементов M=${estimateMean} D=${estimateD}\n`;

    const M = (b - a) / 2 + a;
    const D = (b - a) ** 2 / 12;
    msg += `Точные значения M=${M} D=${D}\n`;
    msg += `Погрешность M=${estimateMean - M}\n`;
    msg += `Погрешность D=${estimateD - D}\n`;

    msg += `${nbsp}\n`;
  }

  return msg;
}

export const EqualDistribution = () => (
  <BaseUi calculate={calculate} name="Моделирование равномерного распределения" />
);
