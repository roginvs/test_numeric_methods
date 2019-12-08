import React, { useState } from "react";

import { useLocalStore, observer } from "mobx-react-lite";

const EPSILON = 0.0000001;

const DEFAULT_MATRIX = `-1.99 -1.47 -1.05 3.24 4.91
-0.79 -1.16 -0.80 -1.15 7.87
-2.91 -2.72 3.85 1.90 5.78
3.25 0.98 0.50 -3.82 1.00`;

function format(v: number) {
  if (Math.abs(v) < EPSILON) {
    return "0         ";
  }
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

  const mReverse: typeof m = [];
  for (let i = 0; i < m.length; i++) {
    const line: number[] = [];
    for (let ii = 0; ii < m[i].length - 1; ii++) {
      line.push(i === ii ? 1 : 0);
    }
    mReverse.push(line);
  }

  let determinantMultiplication = 1;

  addMsg("");

  function dumpState() {
    for (let i = 0; i < m.length; i++) {
      addMsg(
        m[i].map(v => format(v)).join(" ") + "        " + mReverse[i].map(v => format(v)).join(" "),
      );
    }
    addMsg(`    Множитель определителя ${format(determinantMultiplication)}`);
    addMsg("");
  }
  addMsg(`Исходные данные:`);
  dumpState();

  for (let lineNumber = 0; lineNumber < rowsCount; lineNumber++) {
    addMsg(`Прямой ход на строке ${lineNumber}`);
    const targetColumn = lineNumber;
    let nonZeroLineNumber = -1;
    for (
      let nonZeroLineNumberCandidate = lineNumber;
      nonZeroLineNumberCandidate < rowsCount;
      nonZeroLineNumberCandidate++
    ) {
      if (Math.abs(m[nonZeroLineNumberCandidate][targetColumn]) > EPSILON) {
        nonZeroLineNumber = nonZeroLineNumberCandidate;
        break;
      }
    }
    if (nonZeroLineNumber === -1) {
      addMsg(`Вырожденная матрица: Нет ненулевого элемента в столбце ${targetColumn}`);
      return msg;
    }
    if (nonZeroLineNumber !== lineNumber) {
      addMsg(`Меняем местами строки ${lineNumber} и ${nonZeroLineNumber}`);
      let tmp = m[lineNumber];
      m[lineNumber] = m[nonZeroLineNumber];
      m[nonZeroLineNumber] = tmp;

      tmp = mReverse[lineNumber];
      mReverse[lineNumber] = mReverse[nonZeroLineNumber];
      mReverse[nonZeroLineNumber] = tmp;
      determinantMultiplication = determinantMultiplication * -1;
      dumpState();
    }

    if (Math.abs(m[lineNumber][targetColumn]) < EPSILON) {
      addMsg(`Внутренняя ошибка, элемент ${lineNumber}${targetColumn} равен нулю`);
      return msg;
    }
    if (Math.abs(m[lineNumber][targetColumn] - 1) > EPSILON) {
      addMsg(`Нормируем строку, делим на ${m[lineNumber][targetColumn]}`);
      const targetMultiplier = 1 / m[lineNumber][targetColumn];
      determinantMultiplication = determinantMultiplication / targetMultiplier;
      for (let i = 0; i < colsCount; i++) {
        m[lineNumber][i] = m[lineNumber][i] * targetMultiplier;
      }
      for (let i = 0; i < colsCount - 1; i++) {
        mReverse[lineNumber][i] = mReverse[lineNumber][i] * targetMultiplier;
      }

      dumpState();
    }

    for (let targetLineNumber = lineNumber + 1; targetLineNumber < rowsCount; targetLineNumber++) {
      if (Math.abs(m[targetLineNumber][targetColumn]) > EPSILON) {
        const multiplier = -m[targetLineNumber][targetColumn];
        addMsg(
          `Домножаем строку ${lineNumber} на ${multiplier.toPrecision(
            5,
          )} и прибавляем к строке ${targetLineNumber}`,
        );

        for (let i = 0; i < colsCount; i++) {
          m[targetLineNumber][i] = m[targetLineNumber][i] + multiplier * m[lineNumber][i];
        }
        for (let i = 0; i < colsCount - 1; i++) {
          mReverse[targetLineNumber][i] =
            mReverse[targetLineNumber][i] + multiplier * mReverse[lineNumber][i];
        }
        dumpState();
      }
    }
  }

  for (let lineNumber = rowsCount - 1; lineNumber > 0; lineNumber--) {
    const targetColumn = lineNumber;
    addMsg(`Обратный ход на строке ${lineNumber}`);

    if (Math.abs(m[lineNumber][targetColumn] - 1) > EPSILON) {
      addMsg(`Внутренняя ошибка, не 1 на ${lineNumber}x${targetColumn}`);
      return msg;
    }
    for (let targetLineNumber = 0; targetLineNumber < lineNumber; targetLineNumber++) {
      if (Math.abs(m[targetLineNumber][targetColumn]) > EPSILON) {
        const multiplier = -m[targetLineNumber][targetColumn];
        addMsg(
          `Домножаем строку ${lineNumber} на ${multiplier.toPrecision(
            5,
          )} и прибавляем к строке ${targetLineNumber}`,
        );
        for (let i = 0; i < colsCount; i++) {
          m[targetLineNumber][i] = m[targetLineNumber][i] + multiplier * m[lineNumber][i];
        }
        for (let i = 0; i < colsCount - 1; i++) {
          mReverse[targetLineNumber][i] =
            mReverse[targetLineNumber][i] + multiplier * mReverse[lineNumber][i];
        }
        dumpState();
      }
    }
  }
  addMsg(`Определитель = ${determinantMultiplication}`);
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
