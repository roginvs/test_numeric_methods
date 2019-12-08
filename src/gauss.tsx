import React, { useState } from "react";

import { useLocalStore, observer } from "mobx-react-lite";

const DEFAULT_MATRIX = `-1.99 -1.47 -1.05 3.24 4.91
-0.79 -1.16 -0.80 -1.15 7.87
-2.91 -2.72 3.85 1.90 5.78
3.25 0.98 0.50 -3.82 1.00`;

function format(v: number) {
  return (v.toPrecision(3) + "           ").slice(0, 10);
}
function calculate(matrixRaw: string) {
  let msg = "";
  const addMsg = (s: string) => {
    console.info(s);
    msg += `${s}\n`;
  };

  const rowsRaw = matrixRaw
    .split("\n")
    .map(x => x.trim())
    .filter(x => x);
  const rowsCount = rowsRaw.length;
  const m: number[][] = [];
  let colsCount: number | undefined;
  for (const rowRaw of rowsRaw) {
    const cellsValues = rowRaw
      .split(" ")
      .map(x => x.trim())
      .filter(x => x)
      .map(x => parseFloat(x));
    if (colsCount === undefined) {
      colsCount = cellsValues.length;
    } else {
      if (colsCount !== cellsValues.length) {
        addMsg(`Ошибка: Неверное кол-во значений в строке '${rowRaw}'`);
        return msg;
      }
    }
    m.push(cellsValues);
  }
  if (colsCount === undefined) {
    addMsg(`Ошибка: нет столбцов`);
    return msg;
  }
  if (colsCount === rowsCount) {
    addMsg(`Добавляем по нулевому значению для каждой строки`);
    m.forEach(r => r.push(0));
    colsCount++;
  }
  if (colsCount !== rowsCount + 1) {
    addMsg(`Неверное кол-во строк и стобцов! Строк=${rowsCount} столцов=${colsCount}`);
    return msg;
  }

  for (let i = 0; i < m.length; i++) {
    for (let ii = 0; ii < m[i].length; ii++) {
      if (isNaN(m[i][ii])) {
        addMsg(`Не число в строке ${i}, столбец ${ii}`);
        return msg;
      }
    }
  }

  addMsg(`Исходная матрица:`);
  for (const line of m) {
    addMsg(line.map(v => format(v)).join(" "));
  }

  return msg;
}
export const Gauss = () => {
  const [matrix, setMatrix] = useState(DEFAULT_MATRIX);
  const [msg, setMsg] = useState<string | undefined>();

  return (
    <>
      <h2>Метод Гаусса</h2>
      {msg === undefined ? (
        <form>
          <div className="form-group ">
            <label className="">Матрица</label>
            <textarea
              style={{ fontFamily: "monospace" }}
              rows={10}
              className="form-control"
              value={matrix}
              onChange={e => setMatrix(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary btn-block"
            onClick={e => {
              e.preventDefault();
              try {
                setMsg(calculate(matrix));
              } catch (e) {
                setMsg(`${e.name} ${e.message}`);
              }
            }}
          >
            Посчитать
          </button>
        </form>
      ) : (
        <div>
          <div style={{ whiteSpace: "pre", fontFamily: "monospace", fontSize: 14 }}>{msg}</div>

          <button className="mt-3 mb-3 btn btn-secondary" onClick={() => setMsg(undefined)}>
            Сбросить
          </button>
        </div>
      )}
    </>
  );
};
