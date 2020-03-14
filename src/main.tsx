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
import { Hord } from "./hord";
import { Gauss } from "./gauss";
import { Simpson } from "./simpson";
import { DiscreteRandom } from "./discrete_random";

const ROUTINGS = ["span", "gauss", "simpson", "descrete_random"] as const;
type Routing = typeof ROUTINGS[number];
const routesToText = (r: Routing) => {
  return {
    span: "Хорды",
    gauss: "Гаусс",
    simpson: "Симпсон",
    descrete_random: "Дискретная случайная",
  }[r];
};

export const Root = () => {
  //const [isOpen, setIsOpen] = useState(false);

  // const toggle = () => setIsOpen(!isOpen);
  const isOpen = true;

  const forceUpdate = useState<{}>()[1];

  const hash = document.location.hash.replace("#", "") as Routing | "";
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Сборка от {new Date(__BUILT_AT_DATE__).toLocaleString()}</NavbarBrand>

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {ROUTINGS.map(r => (
              <NavItem key={r}>
                <NavLink
                  active={hash === r}
                  href={`#${r}`}
                  onClick={e => {
                    e.preventDefault();
                    document.location.hash = `#${r}`;
                    forceUpdate({});
                  }}
                >
                  {routesToText(r)}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
      <div className="container-sm">
        {hash === "span" ? (
          <Hord />
        ) : hash === "gauss" ? (
          <Gauss />
        ) : hash === "simpson" ? (
          <Simpson />
        ) : hash === "descrete_random" ? (
          <DiscreteRandom />
        ) : (
          <div>Демо</div>
        )}
      </div>
    </div>
  );
};
