export const EPSILON = 0.0000001;

function format(v: number) {
  if (Math.abs(v) < EPSILON) {
    return "0         ";
  }
  return (v.toPrecision(3) + "           ").slice(0, 10);
}
export function calculate(matrixRaw: string) {
  let msg = "";
  const addMsg = (s: string) => {
    console.info(s);
    msg += `${s}\n`;
  };

  const rowsRaw = matrixRaw
    .split("\n")
    .map(x => x.trim())
    .filter(x => x)
    .filter(x => x.indexOf("#") !== 0);

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
        return { msg };
      }
    }
    m.push(cellsValues);
  }
  if (colsCount === undefined) {
    addMsg(`Ошибка: нет столбцов`);
    return { msg };
  }
  if (colsCount === rowsCount) {
    addMsg(`Добавляем по нулевому значению для каждой строки`);
    m.forEach(r => r.push(0));
    colsCount++;
  }
  if (colsCount !== rowsCount + 1) {
    addMsg(`Ошибка: Неверное кол-во строк и стобцов! Строк=${rowsCount} столцов=${colsCount}`);
    return { msg };
  }

  for (let i = 0; i < m.length; i++) {
    for (let ii = 0; ii < m[i].length; ii++) {
      if (isNaN(m[i][ii])) {
        addMsg(`Ошибка: Не число в строке ${i}, столбец ${ii}`);
        return { msg };
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
      addMsg(`Нулевой определитель: Нет ненулевого элемента в столбце ${targetColumn}`);
      return { msg, m };
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
      return { msg, m };
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
      return { msg, m };
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
  return { msg, m, mReverse, determinant: determinantMultiplication };
}
