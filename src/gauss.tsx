import React, { useState } from "react";

import { useLocalStore, observer } from "mobx-react-lite";
import { calculate } from "./gauss.calc";

const DEFAULT_MATRIX_1 = `-1.99 -1.47 -1.05 3.24 4.91
-0.79 -1.16 -0.80 -1.15 7.87
-2.91 -2.72 3.85 1.90 5.78
3.25 0.98 0.50 -3.82 1.00`;

const DEFAULT_MATRIX_2 = `2.40 -3.42 2.65 0.27
2.21 -2.91 -2.02 -3.60
-0.02 -3.63 -1 0.94
-1.02 2.19 0.97 -1.7`;

const DEFAULT_MATRIX_3 = `2.52 1.40 -1.29 -1.88
2.14 -2.20 -2.78 -2.99
-3.17 -2.55 3.64 -1.75
1.08 3.32 1.74 -2.26`;

const DEFAULT_MATRIX_4 = `# Меняются строки местами
0 1 2 3
1 2 0 3
1 4 0 1`;

const DEFAULT_MATRIX_5 = `# Определитель = 0
-3 1 2 1
3 -3 0 1
-3 2 1 1`;
export const Gauss = () => {
  const [matrix, setMatrix] = useState(DEFAULT_MATRIX_1);
  const [msg, setMsg] = useState<string | undefined>();

  return (
    <>
      <h2>Метод Гаусса</h2>
      {msg === undefined ? (
        <>
          <div className="mb-2">
            <button className="btn btn-info mr-1" onClick={() => setMatrix(DEFAULT_MATRIX_1)}>
              Демо 1
            </button>
            <button className="btn btn-info mr-1" onClick={() => setMatrix(DEFAULT_MATRIX_2)}>
              Демо 2
            </button>
            <button className="btn btn-info mr-1" onClick={() => setMatrix(DEFAULT_MATRIX_3)}>
              Демо 3
            </button>

            <button className="btn btn-info mr-1" onClick={() => setMatrix(DEFAULT_MATRIX_4)}>
              Демо 4
            </button>

            <button className="btn btn-info mr-1" onClick={() => setMatrix(DEFAULT_MATRIX_5)}>
              Демо 5
            </button>
          </div>
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
                  setMsg(calculate(matrix).msg);
                } catch (e) {
                  setMsg(`${e.name} ${e.message}`);
                }
              }}
            >
              Посчитать
            </button>
          </form>
        </>
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
