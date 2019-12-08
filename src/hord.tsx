import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { useLocalStore, observer } from "mobx-react-lite";

interface HordParams {
  a: number;
  b: number;
  epsilon: number;
  useAasStart: boolean;
}

function calculate(p: HordParams): string {
  const f = (x: number) => Math.exp(x) * Math.sin(x) + x;
  const fDerivative = (x: number) => Math.exp(x) * Math.sin(x) + Math.exp(x) * Math.cos(x) + 1;
  const fDerivativeDerivative = (x: number) => 2 * Math.exp(x) * Math.cos(x);
  let { a, b, epsilon } = p;
  if (a > b) {
    return "Ошибка: a > b";
  }
  let msg = "";
  const addMsg = (s: string) => {
    console.info(s);
    msg += `${s}\n`;
  };

  const DEMO_STEPS = 30;
  const step = (b - a) / DEMO_STEPS;
  let xStep = a;
  let seenFPositive = false;
  let seenFNegative = false;
  let seenFDPositive = false;
  let seenFDNegative = false;
  let seenFDDPositive = false;
  let seenFDDNegative = false;

  addMsg("Проверяем начальные условия");
  while (xStep < b) {
    addMsg(
      `x = ${xStep.toFixed(20)}   f(x)${f(xStep) > 0 ? ">" : "<"}0   f'(x)${
        fDerivative(xStep) > 0 ? ">" : "<"
      }0   f''(x)${fDerivativeDerivative(xStep) > 0 ? ">" : "<"}0`,
    );
    if (f(xStep) > 0) {
      seenFPositive = true;
    }
    if (f(xStep) < 0) {
      seenFNegative = true;
    }
    if (fDerivative(xStep) > 0) {
      seenFDPositive = true;
    }
    if (fDerivative(xStep) < 0) {
      seenFDNegative = true;
    }
    if (fDerivativeDerivative(xStep) > 0) {
      seenFDDPositive = true;
    }
    if (fDerivativeDerivative(xStep) < 0) {
      seenFDDNegative = true;
    }
    xStep += step;
  }
  if (!seenFNegative || !seenFPositive) {
    addMsg("Ошибка: Не увидел положительных и отрицательных значений");
    return msg;
  }
  if (seenFDPositive && seenFDNegative) {
    addMsg("Ошибка: Увидел положительные и отрицательные значения для первой производной");
    return msg;
  }
  if (seenFDDPositive && seenFDDNegative) {
    addMsg("Ошибка: Увидел положительные и отрицательные значения для второй производной");
    return msg;
  }
  addMsg("");

  const m = Math.min(Math.abs(fDerivative(a)), Math.abs(fDerivative(b)));

  let x = p.useAasStart ? a : b;

  let aSwapped = p.useAasStart ? a : b;
  let bSwapped = p.useAasStart ? b : a;

  addMsg(`Начинаем a=${a} b=${b} x=${x}`);
  while (true) {
    const accuracy = Math.abs(f(x)) / m;
    addMsg(`x = ${x.toFixed(20)} accuracy=${accuracy.toFixed(20)}`);
    if (accuracy < epsilon) {
      break;
    }
    x = x - (f(x) * (x - bSwapped)) / (f(x) - f(bSwapped));
  }
  addMsg(`f(x) = ${f(x)}`);
  addMsg(`Точность достигнута на x = ${x}`);

  return msg;
}

export const Hord = observer(() => {
  const store = useLocalStore<HordParams>(() => ({
    a: 2.6,
    b: 4,
    epsilon: 0.000001,
    useAasStart: true,
  }));

  const [msg, setMsg] = useState();

  return (
    <>
      <h2>Метод хорд</h2>
      <h4>
        e
        <sup>
          <i>x</i>
        </sup>
        sin<i>x</i> + <i>x</i>{" "}
      </h4>
      {msg === undefined ? (
        <>
          <form>
            <div className="form-group ">
              <label className="">Значение a</label>
              <input
                className="form-control"
                type="number"
                value={store.a}
                onChange={e => (store.a = parseInt(e.target.value))}
              />
            </div>
            <div className="form-group ">
              <label className="">Значение b</label>
              <input
                className="form-control"
                type="number"
                value={store.b}
                onChange={e => (store.b = parseInt(e.target.value))}
              />
            </div>
            <div className="form-group ">
              <label className="">Значение epsilon</label>
              <input
                className="form-control"
                type="number"
                value={store.epsilon}
                onChange={e => (store.epsilon = parseInt(e.target.value))}
              />
            </div>
            <FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    checked={store.useAasStart}
                    onChange={() => (store.useAasStart = true)}
                  />
                  Начать с a
                </Label>
              </FormGroup>{" "}
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    checked={!store.useAasStart}
                    onChange={() => (store.useAasStart = false)}
                  />
                  Начать с b
                </Label>
              </FormGroup>
            </FormGroup>
            <button
              className="btn btn-primary btn-block"
              onClick={e => {
                e.preventDefault();
                try {
                  setMsg(calculate(store));
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
});
