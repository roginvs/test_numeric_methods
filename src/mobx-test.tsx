import React, { useMemo } from "react";
import { useLocalStore, observer } from "mobx-react-lite";
import { observable } from "mobx";

const TestString = observer<{ store: { n: number; s: string } }>(({ store }) => {
  console.info("Render nested string");
  return (
    <div>
      <button className="btn btn-info" onClick={() => (store.s += "A")}>
        Nested s={store.s}
      </button>
    </div>
  );
});

const TestNumber = observer<{ store: { n: number; s: string } }>(({ store }) => {
  console.info("Render nested number");
  return (
    <div>
      <button className="btn btn-info" onClick={() => (store.n += 100)}>
        Nested n={store.n}
      </button>
    </div>
  );
});

export const Test1 = observer(() => {
  const USE_LOCAL_STORE = true;
  const store = USE_LOCAL_STORE
    ? useLocalStore(() => ({
        n: 3,
        s: "A",
      }))
    : React.useState(() => {
        console.info(`Creating store`);
        return observable({
          n: 3,
          s: "A",
        });
      })[0];

  console.info(`==== Root render ====`);
  return (
    <div>
      n={store.n} s={store.s}{" "}
      <div>
        <button className="btn btn-info" onClick={() => store.n++}>
          Add n
        </button>
        <button className="btn btn-info" onClick={() => (store.s += "B")}>
          Add s
        </button>
        <TestString store={store} />
        <TestNumber store={store} />
      </div>
    </div>
  );
});
