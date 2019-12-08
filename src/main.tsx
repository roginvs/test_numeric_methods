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

const ROUTINGS = ["span", "gauss"] as const;
type Routing = typeof ROUTINGS[number];
const routesToText = (r: Routing) => {
  return {
    span: "Хорды",
    gauss: "Гаусс",
  }[r];
};

export const Root = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const forceUpdate = useState<{}>()[1];

  const hash = document.location.hash.replace("#", "") as Routing | "";
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Demo</NavbarBrand>

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
        {hash === "span" ? <Hord /> : hash === "gauss" ? <Gauss /> : <div>Демо</div>}
      </div>
    </div>
  );
};
