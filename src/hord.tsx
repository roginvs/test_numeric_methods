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
} from "reactstrap";

import { useLocalStore, observer } from "mobx-react-lite";
export const Hord = observer(() => {
  const store = useLocalStore(() => ({
    a: 0,
    b: 2 * Math.PI,
    epsilon: 0.01,
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
