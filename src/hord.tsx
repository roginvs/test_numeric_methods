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
    a: 1,
    b: 2,
    epsilon: 0.2,
  }));
  return (
    <>
      <h2>Метод хорд</h2>
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
          <label className="">Значение a</label>
          <input className="form-control" type="number" />
        </div>
        <div className="form-group ">
          <label className="">Значение a</label>
          <input className="form-control" type="number" />
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
