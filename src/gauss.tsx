import React, { useState } from "react";

import { useLocalStore, observer } from "mobx-react-lite";
import { calculate } from "./gauss.calc";

const DEFAULT_MATRIX = `-1.99 -1.47 -1.05 3.24 4.91
-0.79 -1.16 -0.80 -1.15 7.87
-2.91 -2.72 3.85 1.90 5.78
3.25 0.98 0.50 -3.82 1.00`;
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
                setMsg(calculate(matrix).msg);
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
