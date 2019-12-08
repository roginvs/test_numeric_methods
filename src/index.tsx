import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Root } from "./main";

const div = document.createElement("div");
document.body.appendChild(div);

ReactDOM.render(<Root />, div);
