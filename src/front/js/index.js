//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";


//include your index.css file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";
import { alignPropType } from "react-bootstrap/esm/types";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
//