import React, { useState } from "react";

import { calculate } from "./simpson.calc";

export const Simpson = () => {
  //  const [a, setA] = useState(0.73);
  //  const [b, setB] = useState(1.46);
  //  const [c, setC] = useState(0.72);
  const [e, setE] = useState(0.0000001);

  const [msg, setMsg] = useState<string | undefined>();

  return (
    <>
      <h2>Метод Симпсона</h2>
      {msg === undefined ? (
        <>
          <div className="mb-2">
            <div className="form-group ">
              <label className="">Точность</label>
              <input
                className="form-control"
                type="number"
                value={e}
                onChange={e => setE(parseInt(e.target.value))}
              />
            </div>
          </div>
          <form>
            <button
              className="btn btn-primary btn-block"
              onClick={ev => {
                ev.preventDefault();
                try {
                  setMsg(calculate(e));
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
