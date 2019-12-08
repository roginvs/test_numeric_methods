import * as React from "react";
import * as ReactDOM from "react-dom";
import { Root } from "./main";

const div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<div>...</div>, div);

import("./css")
  .then(() => {
    ReactDOM.render(<Root />, div);
  })
  .catch(e => {
    ReactDOM.render(<div>Ошибка {`${e.name} ${e.message}`}</div>, div);
  });
