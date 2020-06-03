import React, { useState, useEffect } from "react";

export const BaseUi: React.FC<{
  calculate: () => string;
  name: string;
}> = ({ calculate, name }) => {
  const [msg, setMsg] = useState<string | undefined>();

  useEffect(() => setMsg(calculate()), []);
  return (
    <>
      <h2>Непрерывная случайная величина</h2>
      {msg === undefined ? (
        <>
          <form>Загрузка</form>
        </>
      ) : (
        <div>
          <div style={{ whiteSpace: "pre", fontFamily: "monospace", fontSize: 14 }}>{msg}</div>

          <button
            className="mt-3 mb-3 btn btn-secondary"
            onClick={() => {
              setMsg("");
              setTimeout(() => {
                setMsg(calculate());
              });
            }}
          >
            Еще раз
          </button>
        </div>
      )}
    </>
  );
};
