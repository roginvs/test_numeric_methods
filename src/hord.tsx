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

function calculate(p: HordParams) {
  const f = (x: number) => Math.exp(x) * Math.sin(x) + x;
  const fDerivative = (x: number) => Math.exp(x) * Math.sin(x) + Math.exp(x) * Math.cos(x) + 1;
  let { a, b, epsilon } = p;
  if (a > b) {
    throw new Error("a > b");
  }
  const m = Math.min(fDerivative(a), fDerivative(b));
}

export const Hord = observer(() => {
  const store = useLocalStore<HordParams>(() => ({
    a: 0,
    b: 2 * Math.PI,
    epsilon: 0.000001,
    useAasStart: true,
  }));
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
            console.info(store);
          }}
        >
          Посчитать
        </button>
      </form>
    </>
  );
});
