import React, { useState, useEffect } from "react";
import { BaseUi } from "./03-base-ui";
import { getEstimateD, getEstimateMean } from "./descrete_random.calc";

export const nbsp = "\u00A0";
function calculate() {
  let msg = "";

  for (const lambda of [1, 0.3, 3, 10]) {
    msg += `Лямбда=${lambda}\n`;
    const M = 1 / lambda;
    const D = 1 / lambda ** 2;
    msg += `Точные значения M=${M} D=${D}\n`;

    for (const n of [50, 5000]) {
      const selection: number[] = [];
      for (let i = 0; i < n; i++) {
        const r = Math.random();
        const val = (-1 / lambda) * Math.log(1 - r);
        selection.push(val);
      }
      const estimateMean = getEstimateMean(selection, n);
      const estimateD = getEstimateD(selection, estimateMean, n);
      msg += `На выборке из n=${n} элементов M=${estimateMean} D=${estimateD}\n`;

      msg += `  Погрешность M=${estimateMean - M}\n`;
      msg += `  Погрешность D=${estimateD - D}\n`;
    }
    msg += `${nbsp}\n`;
  }

  return msg;
}

export const ExponentialDistribution = () => (
  <BaseUi calculate={calculate} name="Моделирование показательного распределения" />
);
