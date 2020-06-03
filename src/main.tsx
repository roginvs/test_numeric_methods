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
import { ContinuesRandom } from "./continues_random";
import { EqualDistribution } from "./03-equal-distribution";

const ROUTINGS = [
  "span",
  "gauss",
  "simpson",
  "descrete_random",
  "continues_random",
  "equal_distribution",
] as const;
type Routing = typeof ROUTINGS[number];
const routesToText = (r: Routing) => {
  return {
    span: "Хорды",
    gauss: "Гаусс",
    simpson: "Симпсон",
    descrete_random: "Дискретная случайная",
    continues_random: "Непрерывная случайная",
    equal_distribution: "Моделирование равномерного распределения",
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
            {ROUTINGS.filter(x => x !== "gauss" && x !== "simpson" && x !== "span").map(r => (
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
        ) : hash === "continues_random" ? (
          <ContinuesRandom />
        ) : hash === "equal_distribution" ? (
          <EqualDistribution />
        ) : (
          <div>Демо</div>
        )}
      </div>
    </div>
  );
};
