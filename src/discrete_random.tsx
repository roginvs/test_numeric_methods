import React, { useState } from "react";

import { calculate } from "./descrete_random.calc";

const DEFAULT_INPUT = `-2 0.4
-7 0.2
0 0.4
100 12`;

export const DiscreteRandom = () => {
  const [inputRaw, setInputRaw] = useState(DEFAULT_INPUT);

  const [msg, setMsg] = useState<string | undefined>();

  return (
    <>
      <h2>Дискретная случайная величина</h2>
      {msg === undefined ? (
        <>
          <form>
            <div className="form-group ">
              <label className="">Распределение случайной величины</label>
              <textarea
                style={{ fontFamily: "monospace" }}
                rows={10}
                className="form-control"
                value={inputRaw}
                onChange={e => setInputRaw(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={e => {
                e.preventDefault();
                try {
                  setMsg(calculate(inputRaw));
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
